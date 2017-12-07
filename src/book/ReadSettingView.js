import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DecreaseIcon from 'material-ui-icons/Remove';
import IncreaseIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

const styles = {
  list: {
    '& li': {
    }
  },
  setTitle: {
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '15px'
  },
  setBody: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    '& p': {
      letterSpacing: '5px'
    }
  },
  noOutline: {
    outline: 'none',
    background: '#f3f2d1'
  },
  bkBlock: {
    width: 20,
    height: 20
  },
  button: {
    color: 'black'
  }
}

class ReadSettingView extends Component {
  state = {
    colorList: [
      {bkColor: 'white', fontColor: 'black'},
      {bkColor: '#080C10', fontColor: '#84888E'},
        {bkColor: '#225a84', fontColor: 'white'},
      {bkColor: '#48712a', fontColor: 'white'},
      {bkColor: '#9a3b3b', fontColor: 'white'},
    ],
  }

  changeBackground = (color) => {
    this.props.changeBackground(color);
  }

  render() {
    const { classes, open, closeView, fontSize, letterSpacing, lineHeight, decreaseFontSize,
            increaseFontSize, decreaseLetterSpacing, increaseLetterSpacing, decreaseLineHeight,
            increaseLineHeight } = this.props;
    return (
      <Drawer anchor="top" open={open} onRequestClose={closeView} classes={{paper: classes.noOutline}}>
        <div>
          <List className={classes.list}>
            <ListItem>
              <Typography className={classes.setTitle}>字体大小</Typography>
              <div className={classes.setBody}>
                <IconButton onClick={decreaseFontSize}>
                  <DecreaseIcon />
                </IconButton>
                <Typography>{fontSize}</Typography>
                <IconButton onClick={increaseFontSize}>
                  <IncreaseIcon />
                </IconButton>
              </div>
            </ListItem>
            <ListItem>
              <Typography className={classes.setTitle}>字间距</Typography>
              <div className={classes.setBody}>
                <IconButton onClick={decreaseLetterSpacing}>
                  <DecreaseIcon />
                </IconButton>
                <Typography>{letterSpacing}</Typography>
                <IconButton onClick={increaseLetterSpacing}>
                  <IncreaseIcon />
                </IconButton>
              </div>
            </ListItem>
            <ListItem>
              <Typography className={classes.setTitle}>行间距</Typography>
              <div className={classes.setBody}>
                <IconButton onClick={decreaseLineHeight}>
                  <DecreaseIcon />
                </IconButton>
                <Typography>{lineHeight}</Typography>
                <IconButton onClick={increaseLineHeight}>
                  <IncreaseIcon />
                </IconButton>
              </div>
            </ListItem>
            <ListItem>
              <Typography className={classes.setTitle}>背景颜色</Typography>
              <div className={classes.setBody}>
              {this.state.colorList.map((color) => (
                <span key={color.bkColor} onClick={() => this.changeBackground(color)} className={classes.bkBlock} style={{background: `${color.bkColor}`, border: '1px solid black'}}></span>
              ))}
              </div>
            </ListItem>
          </List>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(ReadSettingView);
