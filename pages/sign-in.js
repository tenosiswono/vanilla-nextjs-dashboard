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
import TextField from 'material-ui/TextField';
import Link from 'next/link';


const styleSheet = createStyleSheet('Module', theme => ({
  root: {
    marginTop: 0,
    width: '100%',
  },
  card: {
    margin: '30vh 20vw 0 20vw',
    padding: '32px',
  },
  title: {
    marginBottom: 16,
    color: theme.palette.text.secondary,
  },
  button: {
    margin: '32px 8px 8px 8px',
    float: 'right',
  },
  [theme.breakpoints.down('md')]: {
    card: {
      margin: '30vh 5vw 0 5vw',
      padding: '32px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    card: {
      margin: '30vh 0 0 0',
      padding: '32px',
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
        <Card className={classes.card}>
          <CardContent>
            <Typography type="title" className={classes.title}>
              Sign in
            </Typography>
            <TextField
              id="email"
              label="Email"
              InputProps={{ placeholder: '' }}
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              fullWidth
              type="password"
              margin="normal"
            />
            <Link href="/">
              <Button color="primary" raised className={classes.button}>
                Sign-in
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Module.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default layout(withStyles(styleSheet)(Module));
