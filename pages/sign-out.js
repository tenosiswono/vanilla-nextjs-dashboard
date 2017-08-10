import React from 'react';
import Cookie from 'js-cookie';
import Router from 'next/router';
import Frame from '../components/frame';
import layout from '../components/layout';

class SignOut extends React.Component {
  componentDidMount () {
    if (process.browser) {
      window.localStorage.removeItem('session');
      Cookie.remove('token');
    }
    Router.push('/sign-in');
  }

  render () {
    return (
        <Frame title="Sign out" description="You will be redirected to login page">
        </Frame>
    )
  }
}

export default layout(SignOut)
