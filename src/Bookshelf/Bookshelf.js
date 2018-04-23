import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {

}

class Bookshelf extends Component {
  state = {
  }

  toBookPage = (bookId) => {
    this.props.history.push(`/${bookId}`);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="topbar-container">
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '10px'}}>
          {this.props.bookshelf.map((book) => (
            <div className="book-container" key={book.bookId}>
              <img onClick={() => this.toBookPage(book.bookId)} className="book-image" src={book.url} alt={book.name}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  bookshelf: appReducer.bookshelf
})

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Bookshelf)));
