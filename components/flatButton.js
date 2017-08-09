import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('FlatButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

function FlatButtons(props) {
  const classes = props.classes;
  return (
    <Button
      className={classes.button}
      color={props.color}
      href={props.href}
      dense={props.dense}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </Button>
  );
}

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  href: PropTypes.string,
  dense: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default withStyles(styleSheet)(FlatButtons);
