import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = {

}

class SearchOptions extends Component {
  state = {
    name: '',
    type: [],
    state: [''],
  }
  render() {
    return (
      <FormControl className={classes.formControl}>
        <Select
          native
          value={this.state.age}
          onChange={this.handleChange('age')}
          className={classes.selectEmpty}
        >
          <option value="">None</option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    )
  }
}

export default withStyles(styles)(SearchOptions);