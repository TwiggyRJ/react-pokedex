import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="bg-black full">
        <div className="align-left pad-10 pad-left-20">
          <p className="white">This is a generic footer</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
