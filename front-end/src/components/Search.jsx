import React from 'react';
import Lists from './Lists';

class Search extends React.Component {
  state = {
    searchValue: '',
    busFilter: '',
  }
  render() {
    const list = this.props.buses
      .filter(bus => !this.state.busFilter ||
        this.state.busFilter.trim().toLowerCase() === bus.busNumber.toLowerCase())
      .reduce((list, bus) => list.concat(bus.route), [])
      .filter(busStop => busStop.toLowerCase().includes(this.state.searchValue.trim().toLowerCase()));
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
        {list.length === 0 ? <div>No results</div> : <Lists list={list} />}

      </div>
    );
  }
}

export default Search;
