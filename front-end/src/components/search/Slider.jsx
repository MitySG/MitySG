import React from 'react';
import Slider from 'material-ui/Slider';
import './Slider.css';

const SliderComponent = props => (
  <div styleName="container">
    <Slider
      styleName="slider"
      {...props}
    />
    <span styleName="label">{props.value} min</span>
  </div>
);

export default SliderComponent;
