import React, { Component } from 'react';
import layout from '../components/layout';

class Module extends Component {
  static async getInitialProps ({ req, query }) {
    return req
      ? { userAgent: req.headers['user-agent'], next: query.next, session: req.session }
      : { userAgent: navigator.userAgent, next: query.next, session: req.session }
  }
  render () {
    return <div>
      Hello {this.props.next} World {this.props.session} {this.props.sessionhaha}
    </div>
  }
}
export default layout((Module));