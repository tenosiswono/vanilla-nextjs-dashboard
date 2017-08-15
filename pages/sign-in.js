import { Component } from 'react';
import Head from 'next/head';
import Cookie from 'js-cookie';

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
import Router from 'next/router';
import loginPage from '../components/loginPage';
import FormsyText from '../components/FormsyWrapper/FromsyText';
import Formsy from 'formsy-react';
import { withReduxSaga } from '../store';
import { loadLogin } from '../actions';


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
  static getInitialProps ({ query }) {
    return query
      ? { next: query.next }
      : { next: '/' }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChangeEmail = event => {
    this.setState({
      email: event.target.value,
    });
  };

  handleChangePassword = event => {
    this.setState({
      password: event.target.value,
    });
  };

  submitLogin = () => {
    this.props.dispatch(loadLogin(this.state.email, this.state.password, this.props.next));
    // const session = { token: "session" };
    // // Store the token for the benefit of client and server
    // window.localStorage.setItem('session', JSON.stringify(session));
    // Cookie.set('token', session.token, { secure: false });
    // Router.push(this.props.next || '/');
  }

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
            <Formsy.Form
              onValidSubmit={this.submitLogin}
            >
              <FormsyText
                label="E-mail"
                style={{ width: '100%' }}
                type="email"
                name="email"
                id="email"
                requiredError="E-mail is required"
                required
                validations="isEmail"
                validationError="Not a valid E-mail"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              /> <br />
              <FormsyText
                label="Password"
                type="password"
                style={{ width: '100%' }}
                name="password"
                id="password"
                requiredError="Password is required"
                required
                value={this.state.password}
                onChange={this.handleChangePassword}
              /><br />
              <Button color="primary" raised className={classes.button} type="submit">
                Sign-in
              </Button>
            </Formsy.Form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Module.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withReduxSaga(loginPage(layout(withStyles(styleSheet)(Module))));
