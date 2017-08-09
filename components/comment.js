import FacebookProvider, { Comments } from 'react-facebook';
import PropTypes from 'prop-types';

/* eslint-disable react/react-in-jsx-scope */
// change this AppID in production!!
// const APPID = '1442217835868495'; // UAT
const APPID = '114410789213723'; // PRODUCTION

const Comment = (props) => (
  <FacebookProvider appId={APPID}>
    <Comments href={props.url} width={props.width} orderBy={props.orderBy} />
  </FacebookProvider>
);

Comment.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  orderBy: PropTypes.string,
};

export default Comment;
