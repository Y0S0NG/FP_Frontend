import React from 'react';
import styles from './Result.module.css';
import gifAnimation from './Thank_You.gif'; // 引用 GIF 文件

function GifDisplay() {
    return (
        <div className={styles.centeredContainer}>
            <img src={gifAnimation} className={styles.gif} alt="GIF Animation" />
        </div>
    );
}

export default GifDisplay;

