import React from 'react';
import styles from './index.module.css';

const Spinner = ({ show = false, containerStyle = null }) => {
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
};

export default Spinner;
