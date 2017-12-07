import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DecreaseIcon from 'material-ui-icons/Remove';
import IncreaseIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

const styles = {
  drawerPaper: {
    outline: 'none',
    width: '50%',
    maxWidth: '300px',
    background: '#f3f2d1'
  },
}

class NavView extends Component {
  state = {
  }

  getChapter = (chapter, index) => {
    this.props.getChapter(chapter, index);
  }

  render() {
    const { classes, open, closeView, chapterList, chapterIndex } = this.props;
    return (
      <Drawer anchor="left" open={open} onRequestClose={closeView}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div>
          <List className={classes.list}>
          {chapterList.slice(chapterIndex - 5 > 0 ? chapterIndex - 5 : 0, chapterIndex + 6).map((chapter, index) => (
            <ListItem key={chapter.name} onClick={() => this.getChapter(chapter, (chapterIndex - 5 > 0 ? chapterIndex - 5 + index : index))} button>
              <ListItemText primary={chapter.name} />
            </ListItem>
          ))}
          </List>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NavView);
