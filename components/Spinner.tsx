import React from 'react';

import { CSSProperties, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    zIndex: 100,
  },
  spinner: {
    margin: '40vh auto',
    width: '50px',
    height: '40px',
    textAlign: 'center',
    fontSize: '10px',

    '& > *': {
      backgroundColor: '#38a169',
      height: '100%',
      width: '6px',
      display: 'inline-block',
      animation: '$spinnerAnimation 1.2s infinite ease-in-out',
    },
  },
  rect1: {
    animationDelay: '-1.2s',
  },
  rect2: {
    animationDelay: '-1.1s',
  },
  rect3: {
    animationDelay: '-1s',
  },
  rect4: {
    animationDelay: '-0.9s',
  },
  rect5: {
    animationDelay: '-0.8s',
  },

  '@keyframes spinnerAnimation': {
    '0%, 40%, 100%': {
      transform: 'scaleY(0.4)',
    },
    '20%': {
      transform: 'scaleY(1)',
    },
  },
}));

interface ISpinnerProps {
  show: boolean;
  containerStyle: CSSProperties;
}

const Spinner = ({
  show = false,
  containerStyle = null,
}: ISpinnerProps): JSX.Element | null => {
  const classes = useStyles();

  let spinner = null;
  if (show) {
    spinner = (
      <div className={classes.container} style={containerStyle}>
        <div className={classes.spinner}>
          <div className={classes.rect1} />
          <div className={classes.rect2} />
          <div className={classes.rect3} />
          <div className={classes.rect4} />
          <div className={classes.rect5} />
        </div>
      </div>
    );
  }

  return spinner;
};

export default Spinner;
