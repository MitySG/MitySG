import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './Search.css';

class Search extends React.Component {
  state = {
    selectedBus: '96',
    selectedStart: undefined,
    selectedEnd: undefined,
  }
  render() {
    const busStopOptions = (this.props.buses[this.state.selectedBus] || [])
      .map((code) => {
        const description = (this.props.busStops[code] || {}).description;
        return {
          value: description,
          label: description,
        };
      });
    return (
      <div className="Search">
        <div className="busSearch">
          Bus
          <Select
            className="busSelect"
            clearable={false}
            value={this.state.selectedBus}
            onChange={selectedBus => this.setState({ selectedBus: selectedBus.value })}
            options={Object.keys(this.props.buses).map(bus => ({
              value: bus,
              label: bus,
            }))}
          />
        </div>
        <div className="busSearch">
          Start
          <Select
            className="busSelect"
            clearable={false}
            value={this.state.selectedStart}
            onChange={selectedStart => this.setState({ selectedStart: selectedStart.value })}
            options={busStopOptions}
          />
        </div>
        <div className="busSearch">
          Stop
          <Select
            className="busSelect"
            clearable={false}
            value={this.state.selectedEnd}
            onChange={selectedEnd => this.setState({ selectedEnd: selectedEnd.value })}
            options={busStopOptions}
          />
        </div>
      </div>
    );
  }
}

export default Search;
