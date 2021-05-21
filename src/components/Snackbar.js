import React from "react";
import styles from './Snackbar.module.css'

const Snackbar = (props) => {
    return (
        <div className={styles.snackBar}>
            {props.message}
        </div>
    )
}

export default Snackbar
