import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const AutoCompleteComponent = props => (
  <AutoComplete
    autoFocus
    filter={(searchText, key) => key.toLowerCase().includes(searchText.toLowerCase())}
    {...props}
  />
);

export default AutoCompleteComponent;
