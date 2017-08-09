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

const styleSheet = createStyleSheet('Index', theme => ({
  root: {
    marginTop: 0,
    width: '100%',
  },
  container: {
    width: '100%',
    minHeight: 'calc(100vh - 131px)',
    margin: 0,
  },
  heading: {
    padding: '112px 32px 32px 32px',
    color: '#fff',
    background: '#eee',
    marginBottom: '-100px',
    height: '150px',
  },
  cardsDiv: {
    padding: '0 10vh',
    width: 'calc(100% + 8px)',
  },
  card: {
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.down('sm')]: {
    cardsDiv: {
      padding: '0',
      margin: '0 0 0 -4px',
      width: 'calc(100% + 8px)',
    },
  },
}));

/* eslint-disable react/react-in-jsx-scope */
class Index extends Component {
  render() {
    const classes = this.props.classes;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div className={classes.root}>
        <Head>
          <title>Xcidic Blog - An Innovative Technology Lab</title>
          <meta content="Xcidic is a fast growing startup based in Singapore with a focus on re-defining web development, web design, and e-commerce. We love data and care deeply about creative design at the front-end as well as the beautiful coding at the back." name="description" />
          <meta content="web developer, web development, web developers, ecommerce website design, web development company, ecommerce website development, web programming, good website design, cool website designs, creative web design, web design software, web design services, design company, responsive web design, ecommerce design, web designing and programming, web development company, web development services" name="keywords" />
        </Head>
        <Frame>
          <div className={classes.container}>
            <div className={classes.heading}>
              <Typography type="title" gutterBottom>
                Dashboard
              </Typography>
              <Typography type="subheading" gutterBottom>
                Dashboard and information for informed user
              </Typography>
            </div>
            <Grid container className={` ${classes.cardsDiv}`}>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography type="body1" className={classes.title}>
                      Word of the Day
                    </Typography>
                    <Typography type="headline" component="h2">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography type="body1" className={classes.pos}>
                      adjective
                    </Typography>
                    <Typography component="p">
                      well meaning and kindly.<br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button dense>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography type="body1" className={classes.title}>
                      Word of the Day
                    </Typography>
                    <Typography type="headline" component="h2">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography type="body1" className={classes.pos}>
                      adjective
                    </Typography>
                    <Typography component="p">
                      well meaning and kindly.<br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button dense>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography type="body1" className={classes.title}>
                      Word of the Day
                    </Typography>
                    <Typography type="headline" component="h2">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography type="body1" className={classes.pos}>
                      adjective
                    </Typography>
                    <Typography component="p">
                      well meaning and kindly.<br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button dense>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Frame>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default layout(withStyles(styleSheet)(Index));
