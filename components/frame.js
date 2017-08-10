import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import NotificationsIcon from 'material-ui-icons/Notifications';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import FlatButton from '../components/flatButton';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import compose from 'recompose/compose';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Badge from 'material-ui/Badge';
import SearchField from '../components/searchField';
import Menu, { MenuItem } from 'material-ui/Menu';
import SearchIcon from 'material-ui-icons/Search';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Dialog from 'material-ui/Dialog';
import Fade from 'material-ui/transitions/Fade';

const styleSheet = createStyleSheet('Frame', theme => ({
  root: {
    minHeight: '100vh',
    paddingBottom: 64,
    width: '100%',
  },
  appBar: {
    background: '#fafafa',
    position: 'fixed',
  },
  appBarLogo: {
    padding: 0,
  },
  appBarLogoImg: {
    padding: '0 16px',
  },
  appbarText: {
    color: '#000',
  },
  labelText: {
    fontSize: 15,
    fontFamily: 'Gotham',
    textTransform: 'none',
  },
  flatStyle: {
    marginRight: 4,
    marginLeft: 4,
  },
  gridStyle: {
    height: '100%',
    margin: '0px -16px 0px -32px',
  },
  divList: {
    width: 300,
  },
  drawer: {
    width: '250px',
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  userName: {
    width: '100%',
  },
  userGrid: {
  },
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
  menuNotification: {
    width: 250,
  },
  notificationIcon: {
    marginRight: 16,
  },
  subItem: {
    textIndent: 24,
  },
  navHidden: {
    width: 0,
  },
  children: {
    margin: 0,
    padding: 0,
  },
  [theme.breakpoints.up('md')]: {
    appBarShift: {
      width: 'calc(100% - 250px)',
    },
    childrenShift: {
      marginLeft: '250px',
      width: 'calc(100% - 250px)',
    },
  },
}));

/* eslint-disable react/react-in-jsx-scope */
class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: isWidthUp('md', props.width),
      userMenuOpen: false,
      notificationOpen: false,
      anchorEl: undefined,
      searchDialogOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  }

  toggleClick = () => {
    if (!isWidthUp('md', this.props.width)) {
      this.setState({ open: !this.state.open });
    }
  }

  toggleUserMenu = () => {
    this.setState({ userMenuOpen: !this.state.userMenuOpen });
  }

  handleNotificationClose = () => {
    this.setState({ notificationOpen: false });
  }

  handleNotificationOpen = event => {
    this.setState({ notificationOpen: true, anchorEl: event.currentTarget });
  }

  handleSearchDialogRequestClose = () => {
    this.setState({ searchDialogOpen: false });
  };

  handleSearchDialogOpen = () => {
    this.setState({ searchDialogOpen: true });
  };

  render() {
    const { children, width } = this.props;
    const classes = this.props.classes;

    let drawerDocked = isWidthUp('md', width);
    let appBarClassName = classes.appBar;
    let drawerClassName =  classes.navHidden;
    let childrenClassName =  classes.children;

    if (this.state.open) {
      appBarClassName += ` ${classes.appBarShift}`;
      drawerClassName = classes.drawer;
      childrenClassName += ` ${classes.childrenShift}`;
    }

    const navigationList = (
      <div className={classes.drawer}>
        <Grid container direction="column" align="center" spacing={0} className={classes.userGrid}>
          <Grid item>
            <Avatar className={classes.avatar}>A</Avatar>
          </Grid>
          <Grid item className={classes.userName}>
            <div onClick={this.toggleUserMenu}>
              <ListItem button>
                <ListItemText primary="Admin" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    {this.state.userMenuOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
            <Collapse in={this.state.userMenuOpen} transitionDuration="auto" unmountOnExit>
              <div onClick={this.toggleClick}>
                <ListItem button className={classes.subItem}>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button className={classes.subItem}>
                  <ListItemText primary="Setting" />
                </ListItem>
                <ListItem button className={classes.subItem}>
                  <ListItemText primary="Sign out" />
                </ListItem>
              </div>
            </Collapse>
          </Grid>
        </Grid>
        <Divider />
        <div onClick={this.toggleClick}>
          <Link href="/">
            <ListItem button>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default" className={appBarClassName}>
          <Toolbar className={classes.appBarLogo}>
            <IconButton color="default" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Project Vanilla
            </Typography>
            <Hidden smDown>
              <SearchField />
            </Hidden>
            <Hidden smUp>
              <IconButton color="default" aria-label="Search" onClick={this.handleSearchDialogOpen}>
                <SearchIcon />
              </IconButton>
            </Hidden>
            <Dialog
              fullScreen
              open={this.state.searchDialogOpen}
              onRequestClose={this.handleSearchDialogRequestClose}
              transition={<Fade />}
            >
              <AppBar color="default">
                <Toolbar className={classes.appBarLogo}>
                  <IconButton onClick={this.handleSearchDialogRequestClose} aria-label="Close">
                    <ArrowBackIcon />
                  </IconButton>
                  <SearchField fixed />
                </Toolbar>
              </AppBar>
            </Dialog>
            <IconButton color="default" aria-label="Notification" className={classes.notificationIcon}  onClick={this.handleNotificationOpen}>
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="simple-menu"
              open={this.state.notificationOpen}
              onRequestClose={this.handleNotificationClose}
              anchorEl={this.state.anchorEl}
              onClick={this.handleNotificationClose}
              className={classes.menuNotification}
            >
              <ListItem button>
                <Avatar>A</Avatar>
                <ListItemText primary="Eat" secondary="Jan 7, 2016" />
              </ListItem>
              <ListItem button>
                <Avatar>B</Avatar>
                <ListItemText primary="Pray" secondary="Jan 7, 2016" />
              </ListItem>
              <ListItem button>
                <Avatar>C</Avatar>
                <ListItemText primary="Dota" secondary="Jan 7, 2016" />
              </ListItem>
              <ListItem button>
                <Avatar>D</Avatar>
                <ListItemText primary="Work" secondary="Jan 7, 2016" />
              </ListItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.open}
          onRequestClose={this.toggleDrawer}
          docked={drawerDocked}
          className={drawerClassName}
        >
          {navigationList}
        </Drawer>
        <div className={childrenClassName}>
          {children}
        </div>
      </div>
    );
  }
}

Frame.propTypes = {
  children: PropTypes.node.isRequired,
};
export default compose(withStyles(styleSheet), withWidth())(Frame);
