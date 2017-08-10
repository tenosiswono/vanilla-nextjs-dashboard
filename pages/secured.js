import { Component } from 'react';
import Head from 'next/head';

import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import layout from '../components/layout';
import Frame from '../components/frame';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

import TableExample from '../components/table';
import securePage from '../components/securePage';

const styleSheet = createStyleSheet('Module', theme => ({
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
    marginBottom: 16,
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
class Module extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Head>
          <title>Project Vanilla - Module</title>
          <meta content="Project Vanilla Dashboard" name="description" />
          <meta content="web developer, web development, web developers, ecommerce website design, web development company, ecommerce website development, web programming, good website design, cool website designs, creative web design, web design software, web design services, design company, responsive web design, ecommerce design, web designing and programming, web development company, web development services" name="keywords" />
        </Head>
        <Frame title="Module" description="Module view for maintain and performing create read update operation">
          <Grid container className={` ${classes.cardsDiv}`}>
            <Grid item xs={12} sm={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography type="title" className={classes.title}>
                    Table
                  </Typography>
                  <TableExample />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Frame>
      </div>
    );
  }
}

Module.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default securePage(layout(withStyles(styleSheet)(Module)));
