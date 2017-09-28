import { connect } from 'react-redux';
import StepButtons from './StepButtons';
import { setSlideIndex } from '../../actions';

const mapStateToProps = state => ({
  notificationValue: state.notificationValue,
});

export default connect(
  mapStateToProps,
  { setSlideIndex },
)(StepButtons);
