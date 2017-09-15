import React from 'react';
import Lists from './Lists';

class Search extends React.Component {
  render() {
    const lists = [
      {
        header: 'Buses',
        items: this.props.buses.map(bus => bus.busNumber),
      },
      {
        header: 'Bus stops',
        items: this.props.buses.reduce((list, bus) => list.concat(bus.route), []),
      },
    ];
    return (
      <div >
        <input
          type="search"
          placeholder="Search"
        />
        <Lists lists={lists} />
      </div>
    );
  }
}

export default Search;
