import React from 'react';
import Lists from './Lists';

class Search extends React.Component {
  state = {
    searchValue: '',
    busFilter: '',
  }
  render() {
    const searchValue = this.state.searchValue.trim().toLowerCase();
    const busFilter = this.state.busFilter.trim();
    const busStops = (busFilter
      ? (this.props.buses[busFilter.toLowerCase()] || this.props.buses[busFilter.toUpperCase()] || [])
          .map(code => ({ ...this.props.busStops[code], code }))
      : Object.entries(this.props.busStops).map(([code, busStop]) => ({ ...busStop, code })))
        .filter(busStop => busStop.description &&
          (busStop.description.toLowerCase().includes(searchValue) ||
           busStop.code.includes(searchValue)));
    return (
      <div >
        <input
          type="search"
          placeholder="Search"
          onChange={e => this.setState({ searchValue: e.target.value })}
        />
        <input
          type="search"
          placeholder="Filter by bus number"
          onChange={e => this.setState({ busFilter: e.target.value })}
        />
        {busStops.length === 0 ? <div>No results</div> : <Lists list={busStops} />}

      </div>
    );
  }
}

export default Search;
