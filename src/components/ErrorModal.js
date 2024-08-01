import React from 'react';
import styles from './ErrorModal.module.css';

function ErrorModal({ message, onClose }) {
    if (!message) return null;

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <button onClick={onClose} className={styles.closeButton}>关闭</button>
            </div>
        </div>
    );
}

export default ErrorModal;
