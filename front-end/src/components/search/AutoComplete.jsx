import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import StepButtons from './StepButtonsContainer';

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
        <StepButtons
          nextDisabled={!this.props.dataSource.includes(this.props.searchText)}
          onNext={this.props.onNext}
          onPrev={this.props.onPrev}
          stepIndex={this.props.stepIndex}
        />
      </div>

    );
  }
}

export default AutoCompleteComponent;
