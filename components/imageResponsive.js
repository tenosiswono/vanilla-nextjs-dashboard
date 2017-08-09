import React from 'react';

class ImageResponsive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opacity: 0 };
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    if (this.img.complete) {
      this.onLoad();
    }
  }

  onLoad() {
    if (this.state.opacity < 1) {
      this.setState({ opacity: 1 });
    }
  }

  render() {
    return (
      <div style={{ height: '100%', display: 'block', overflow: 'hidden', position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', background: '#fff' }}>
        <img
          src={this.props.src}
          style={{ position: 'absolute', top: 0, bottom: 0, left: '-9999px', right: '-9999px', maxWidth: 'none', maxHeight: '100%', minHeight: '100%', margin: '0 auto', transition: 'opacity 0.5s', opacity: this.state.opacity }}
          alt={this.props.alt}
          onLoad={this.onLoad}
          ref={(e) => (this.img = e)}
        />
      </div>
    );
  }
}

ImageResponsive.propTypes = {
  alt: React.PropTypes.string,
  src: React.PropTypes.string,
};

export default ImageResponsive;
