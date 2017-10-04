import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const SnackbarComponent = props => (
  <Snackbar
    contentStyle={{ textAlign: 'center' }}
    open={!!props.message}
    autoHideDuration={4000}
    {...props}
  />
);

export default SnackbarComponent;
