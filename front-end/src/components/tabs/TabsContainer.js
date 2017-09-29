import { connect } from 'react-redux';
import Tabs from './Tabs';
import { setSlideIndex } from '../../actions';

const mapStateToProps = state => ({
  slideIndex: state.slideIndex,
});

export default connect(
  mapStateToProps,
  { setSlideIndex },
)(Tabs);
