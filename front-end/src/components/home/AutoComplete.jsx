import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const muiTheme = getMuiTheme(darkBaseTheme);

class AutoCompleteComponent extends React.Component {
  state = {
    open: false,
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AutoComplete
          animated={false}
          open={this.state.open}
          autoFocus
          textFieldStyle={{ maxWidth: '200px' }}
          menuStyle={{ maxWidth: '200px', maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}
          onClick={() => this.setState({ open: true })}
          filter={(searchText, key) => !key || key.toLowerCase().includes(searchText.toLowerCase())}
          {...this.props}
        />
      </MuiThemeProvider>
    );
  }
}

export default AutoCompleteComponent;
