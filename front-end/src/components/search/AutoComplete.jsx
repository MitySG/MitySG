import React from 'react';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './AutoComplete.css';

const muiTheme = getMuiTheme({
  textField: {
    textColor: 'white',
    width: '100px',
  },
});

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted}>
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={index} style={{ fontWeight: 300 }}>
            {part.text}
          </span>
        ) : (
          <strong key={index} style={{ fontWeight: 500 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps}>
      {children}
    </Paper>
  );
}

class AutoComplete extends React.Component {
  state = {
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const suggestions = this.props.data.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue));
    this.setState({ suggestions });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Autosuggest
          theme={theme}
          renderInputComponent={inputProps => <TextField id={this.props.inputProps.placeholder} {...inputProps} />}
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderSuggestion={renderSuggestion}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={() => this.setState({ suggestions: [] })}
          getSuggestionValue={suggestion => suggestion}
          inputProps={this.props.inputProps}
        />
      </MuiThemeProvider>
    );
  }
}

export default AutoComplete;
