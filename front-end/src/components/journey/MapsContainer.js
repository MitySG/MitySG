import { connect } from 'react-redux';
import Maps from './Maps';

const mapStateToProps = state => ({
  currentCoords: state.currentCoords,
});

export default connect(
  mapStateToProps,
)(Maps);
