import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class AutoCompleteComponent extends React.Component {
  state = {
    open: false,
  }

  render() {
    return (
      <div>
        <AutoComplete
          open={this.state.open}
          autoFocus
          menuStyle={{ maxHeight: '300px' }}
          onClick={() => this.setState({ open: true })}
          filter={(searchText, key) => !key || key.toLowerCase().includes(searchText.toLowerCase())}
          {...this.props}
        />
      </div>
    );
  }
}

export default AutoCompleteComponent;
