import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'react-icons/lib/md/keyboard-arrow-left';
import OptionIcon from 'react-icons/lib/md/more-vert';

const styles = {
  backIcon: {
    color: '#FAFAFA',
    fontSize: '40px'
  },
  optionIcon: {
    color: '#FAFAFA',
    fontSize: '30px'
  }
}

class OptionTopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" style={{background: 'rgba(0,0,0,0.5)'}}>
        <Toolbar style={{justifyContent: 'space-between'}}>
          <IconButton
            classes={{
              root: classes.backIcon
            }}
            onClick={this.props.goBack}>
            <BackIcon />
          </IconButton>
          <IconButton
            classes={{
              root: classes.optionIcon
            }}
            onClick={this.props.openOptions}>
            <OptionIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(OptionTopBar);
