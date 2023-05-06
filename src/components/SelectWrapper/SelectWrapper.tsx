import React from 'react';
import styles from './SelectWrapper.module.css';
import Select from "../UI/Select/Select";

interface SelectWrapper {
    options: String[],
    title: String
}

const SelectWrapper = ({options, title}: SelectWrapper) => {
    return (
        <div className={styles.root}>
            <p className={styles.title}>{title}</p>
            <Select options={options}/>
        </div>
    );
};

export default SelectWrapper;