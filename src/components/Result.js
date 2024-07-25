import React from 'react';
import styles from './Result.module.css';

function GifDisplay() {
    return (
        <div className={styles.centeredContainer}>
            <img src={`${process.env.PUBLIC_URL}/Thank_You.gif`} className={styles.gif} alt="Animation" />
        </div>
    );
}

export default GifDisplay;

