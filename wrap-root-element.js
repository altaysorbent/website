import React from 'react';
import { SnackbarProvider } from 'notistack';

export default ({ element }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={5000}
    >
      {element}
    </SnackbarProvider>
  );
};
