import React, { Component } from 'react';
import Head from 'next/head';

import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import securePage from '../../components/securePage';

import { loadArticles } from '../../actions';
import { withReduxSaga } from '../../store';
import TableArticles from '../../components/article/tableArticles';
import layout from '../../components/layout';
import Frame from '../../components/frame';

const styleSheet = createStyleSheet('Article', (theme) => ({
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

const getSessionFromLocalStorage = () => {
  try {
    return JSON.parse(window.localStorage.getItem('session'));
  } catch (error) {
    return null;
  }
};

/* eslint-disable react/react-in-jsx-scope */
class Article extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
  };

  static async getInitialProps({ store, req }) {
    const session = process.browser
      ? getSessionFromLocalStorage()
      : req.session;
    if (!store.getState().articles) {
      store.dispatch(loadArticles(session.token));
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Head>
          <title>Project Vanilla - Article</title>
          <meta content="Project Vanilla Dashboard" name="description" />
          <meta content="web developer, web development, web developers, ecommerce website design, web development company, ecommerce website development, web programming, good website design, cool website designs, creative web design, web design software, web design services, design company, responsive web design, ecommerce design, web designing and programming, web development company, web development services" name="keywords" />
        </Head>
        <Frame title="Article" description="Article view for maintain and performing create read update operation">
          <Grid container className={` ${classes.cardsDiv}`}>
            <Grid item xs={12} sm={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography type="title" className={classes.title}>
                    Search
                  </Typography>
                </CardContent>
              </Card>
              <TableArticles />
            </Grid>
          </Grid>
        </Frame>
      </div>
    );
  }
}

Article.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withReduxSaga(securePage(layout(withStyles(styleSheet)(Article))));
