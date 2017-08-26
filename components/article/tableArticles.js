import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import RemoveRedEyeIcon from 'material-ui-icons/RemoveRedEye';
import EditIcon from 'material-ui-icons/Edit';
import FilterListIcon from 'material-ui-icons/FilterList';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import { selectListArticle, selectError } from '../../selectors';
import Error from '../error';

const columnData = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'created', numeric: false, disablePadding: false, label: 'Created Date' },
  { id: 'user.displayName', numeric: false, disablePadding: false, label: 'Created By' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

class ListArticleHead extends Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    lengthData: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, lengthData } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell checkbox>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < lengthData}
              checked={numSelected === lengthData}
              onChange={onSelectAllClick}
            />
          </TableCell>
          { columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this) }
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyleSheet = createStyleSheet((theme) => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.accent.A700,
        backgroundColor: theme.palette.accent.A100,
      }
      : {
        color: theme.palette.accent.A100,
        backgroundColor: theme.palette.accent.A700,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  titleText: {
    color: theme.palette.text.secondary,
  },
}));

let ListArticleToolbar = (props) => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0
          ? <Typography type="subheading">
            {numSelected} selected
          </Typography>
          : <Typography type="title" className={classes.titleText}>Articles</Typography>}
      </div>
      <div className={classes.spacer} />
      <div>
        <Link href="/articles/create">
          <IconButton aria-label="Add">
            <AddIcon />
          </IconButton>
        </Link>
      </div>
      <div className={classes.actions}>
        {numSelected > 0
          ? <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          : <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>}
      </div>
    </Toolbar>
  );
};

ListArticleToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

ListArticleToolbar = withStyles(toolbarStyleSheet)(ListArticleToolbar);

const styleSheet = createStyleSheet((theme) => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));

class ListArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'title',
      selected: [],
      data: [],
    };
  }

  componentDidMount() {
    if (this.props.articles) {
      this.setState({ data: this.props.articles.data });
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.articles && nextProps.articles.data !== this.state.data) {
      this.setState({ data: nextProps.articles.data });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = this.state.data.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n._id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const classes = this.props.classes;
    const { data, order, orderBy, selected } = this.state;
    const { error } = this.props;

    return (
      <Paper className={classes.paper}>
        <ListArticleToolbar numSelected={selected.length} />
        <Table>
          <ListArticleHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            lengthData={data ? data.length : 0}
          />
          <TableBody>
            {data && data.map((n) => {
              const isSelected = this.isSelected(n._id);
              const created = new Date(n.created);
              return (
                <TableRow
                  hover
                  onKeyDown={(event) => this.handleKeyDown(event, n._id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={n._id}
                  selected={isSelected}
                >
                  <TableCell checkbox onClick={(event) => this.handleClick(event, n._id)}>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell disablePadding>
                    {n.title}
                  </TableCell>
                  <TableCell>
                    {n.status}
                  </TableCell>
                  <TableCell>
                    {created.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {n.user.displayName}
                  </TableCell>
                  <TableCell>
                    <Link as={`/articles/view/${n._id}`} href={`/articles/view?id=${n._id}`}>
                      <IconButton color="default" aria-label="View">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Link>
                    <Link as={`/articles/edit/${n._id}`} href={`/articles/edit?id=${n._id}`}>
                      <IconButton color="default" aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton color="default" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {error && <Error />}
      </Paper>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  articles: selectListArticle(),
  error: selectError(),
});

ListArticle.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  articles: PropTypes.object,
};

export default connect(mapStateToProps)(withStyles(styleSheet)(ListArticle));
