import { Component } from 'react';
import Head from 'next/head';

import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';

import PieChart from '../components/pie';
import LineChart from '../components/line';
import BarChart from '../components/bar';
import TableExample from '../components/table';
import securePage from '../components/securePage';

import layout from '../components/layout';
import Frame from '../components/frame';

const styleSheet = createStyleSheet('Index', (theme) => ({
  root: {
    marginTop: 0,
    width: '100%',
  },
  cardsDiv: {
    padding: '0 3vw',
    width: 'calc(100% + 8px)',
  },
  card: {
  },
  title: {
    margin: '8px 8px 16px 8px',
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.down('sm')]: {
    cardsDiv: {
      margin: '0 0 0 -2px',
      padding: '0',
      width: 'calc(100% + 2px)',
    },
  },
}));

/* eslint-disable react/react-in-jsx-scope */
class Index extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Head>
          <title>Project Vanilla</title>
          <meta content="Project Vanilla Dashboard" name="description" />
          <meta content="web developer, web development, web developers, ecommerce website design, web development company, ecommerce website development, web programming, good website design, cool website designs, creative web design, web design software, web design services, design company, responsive web design, ecommerce design, web designing and programming, web development company, web development services" name="keywords" />
        </Head>
        <Frame title="Dashboard" description="Dashboard and information for informed user">
          <Grid container className={` ${classes.cardsDiv}`}>
            <Grid item xs={12} sm={12} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography type="title" className={classes.title}>
                    Line Chart
                  </Typography>
                  <LineChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography type="title" className={classes.title}>
                    Pie Chart
                  </Typography>
                  <PieChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography type="title" className={classes.title}>
                    Bar Chart
                  </Typography>
                  <BarChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TableExample />
            </Grid>
          </Grid>
        </Frame>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default securePage(layout(withStyles(styleSheet)(Index)));
