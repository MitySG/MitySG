import React from 'react';
import Slider from 'material-ui/Slider';
import './Slider.css';

const SliderComponent = props => (
  <div>
    <div styleName="title">How long before arrival to notify?</div>
    <div styleName="container">
      <Slider
        styleName="slider"
        step={1}
        min={2}
        max={10}
        {...props}
      />
      <span styleName="label">{props.value} min</span>
    </div>
  </div>
);

export default SliderComponent;
