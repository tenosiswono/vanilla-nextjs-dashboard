import React, { Component } from 'react';
import Head from 'next/head';

import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import securePage from '../../components/securePage';

import { addArticle } from '../../actions';
import { withReduxSaga } from '../../store';

import layout from '../../components/layout';
import Frame from '../../components/frame';
import { selectError } from '../../selectors';

const styleSheet = createStyleSheet('AddArticle', (theme) => ({
  root: {
    marginTop: 0,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
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
  button: {
    marginTop: 16,
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
}

/* eslint-disable react/react-in-jsx-scope */
class AddArticle extends Component {

  constructor(props) {
    super(props);
    this.state ={
      title: '',
      content: '',
    };
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleChangeContent = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  submitArticle = () => {
    this.props.dispatch(addArticle(this.state.title, this.state.content, getSessionFromLocalStorage().token));
  };

  render() {
    const classes = this.props.classes;
    const { title, content } = this.state;

    return (
      <div className={classes.root}>
        <Head>
          <title>Project Vanilla - Article</title>
          <meta content="Project Vanilla Dashboard" name="description" />
          <meta content="web developer, web development, web developers, ecommerce website design, web development company, ecommerce website development, web programming, good website design, cool website designs, creative web design, web design software, web design services, design company, responsive web design, ecommerce design, web designing and programming, web development company, web development services" name="keywords" />
        </Head>
        <Frame title="Add Article" description="">
          <Grid container className={` ${classes.cardsDiv}`}>
            <Grid item xs={12} sm={12}>
              <div className={classes.container}>
                <Grid item xs={12} sm={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      <TextField
                        label="Title"
                        id="margin-none"
                        className={classes.textField}
                        fullWidth
                        value={title}
                        onChange={this.handleChangeTitle}
                      />
                      <TextField
                        label="Content"
                        id="multiline-static"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        multiline
                        rows="10"
                        value={content}
                        onChange={this.handleChangeContent}
                      />
                      <Button raised color="primary" className={classes.button} type="submit" onClick={this.submitArticle}>
                        SUBMIT
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Frame>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectError(),
});

AddArticle.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default withReduxSaga(securePage(connect(mapStateToProps)(layout(withStyles(styleSheet)(AddArticle)))));
