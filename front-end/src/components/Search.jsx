import React from 'react';
import Lists from './Lists';

class Search extends React.Component {
  render() {
    const list = this.props.buses.reduce((list, bus) => list.concat(bus.route), []);
    return (
      <div >
        <input
          type="search"
          placeholder="Search"
        />
        <input
          type="search"
          placeholder="Filter by bus number"
        />
        <Lists list={list} />
      </div>
    );
  }
}

export default Search;
