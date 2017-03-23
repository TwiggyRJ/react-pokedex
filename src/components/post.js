import React, { Component } from 'react';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { next: '' };
    this.navigate = this.navigate.bind(this);
  }

  navigate(e) {
    let id = e.target.dataset.id;
    this.setState({next: id});
    this.props.callbackParent(id, 'post');
    e.preventDefault();
  }

  render() {
    return (
      <div className="">
        <h2 className="align-left">{ this.props.post.title.rendered }</h2>
        <p className="align-left" dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered }}></p>
        <p className="align-left">
          <a className="align-left black" href="#" data-id={ this.props.post.id } onClick={ this.navigate }>See More</a>
        </p>
      </div>
    );
  }
}

export default Post;
