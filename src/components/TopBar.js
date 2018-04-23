import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'react-icons/lib/md/menu';

const styles = {
  icon: {
    color: '#FAFAFA'
  }
}

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" style={{background: 'rgba(0,0,0,0.5)'}}>
        <Toolbar>
          <IconButton
            classes={{
              root: classes.icon
            }}
            onClick={this.props.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopBar);
