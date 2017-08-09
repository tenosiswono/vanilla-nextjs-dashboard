import { Component } from 'react';
import Head from 'next/head';

import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import layout from '../components/layout';
import Frame from '../components/frame';

const styles = {
  root: {
    marginTop: 0,
    width: '100%',
  },
  container: {
    width: '100%',
    margin: '80px 0 0 0',
    textAlign: 'center',
    minHeight: 'calc(100vh - 131px)',
  },
};

/* eslint-disable react/react-in-jsx-scope */
class Index extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Head>
          <title>Xcidic Blog - An Innovative Technology Lab</title>
          <meta content="Xcidic is a fast growing startup based in Singapore with a focus on re-defining web development, web design, and e-commerce. We love data and care deeply about creative design at the front-end as well as the beautiful coding at the back." name="description" />
          <meta content="web developer, web development, web developers, ecommerce website design, web development company, ecommerce website development, web programming, good website design, cool website designs, creative web design, web design software, web design services, design company, responsive web design, ecommerce design, web designing and programming, web development company, web development services" name="keywords" />
        </Head>
        <Frame>
          <Grid container direction="row" style={styles.container}>
          </Grid>
        </Frame>
      </div>
    );
  }
}

export default layout(Index);
