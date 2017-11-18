import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {this.props.novelList.map((novel) => (
          <Link key={novel.name + novel.href} to={`/${novel.href}`}>{novel.name}</Link>
        ))}
      </div>
    )
  }
}

export default HomePage;
