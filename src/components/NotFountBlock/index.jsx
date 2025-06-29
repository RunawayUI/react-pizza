import React from 'react'

import styles from './NotFound.module.scss'

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>:(</span>
                <br />
                NotFoundBlock
            </h1>
            <p className={styles.description}>К сожалению, данная страница отсутствует в нашем интернет-магазине</p>
        </div>
    )
}

export default NotFoundBlock