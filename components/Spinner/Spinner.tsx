import React, { type CSSProperties } from 'react';

import styles from './Spinner.module.css';

interface ISpinnerProps {
  show: boolean;
  containerStyle?: CSSProperties;
}

export default function Spinner({
  show = false,
  containerStyle = {},
}: ISpinnerProps): React.JSX.Element | null {
  let spinner = null;
  if (show) {
    spinner = (
      <div className={styles.container} style={containerStyle}>
        <div className={styles.spinner}>
          <div className={styles.rect1} />
          <div className={styles.rect2} />
          <div className={styles.rect3} />
          <div className={styles.rect4} />
          <div className={styles.rect5} />
        </div>
      </div>
    );
  }

  return spinner;
}
