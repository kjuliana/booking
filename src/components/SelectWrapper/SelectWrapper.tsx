import React from 'react';
import styles from './SelectWrapper.module.css';
import Select from "../UI/Select/Select";

interface SelectWrapper {
    options: string[],
    title: string,
    id: string,
    onChange: (newValue: string)=>void,
}

const SelectWrapper = ({options, id, title, onChange}: SelectWrapper) => {
    return (
        <div className={styles.root}>
            <label htmlFor={id} className={styles.title}>{title}</label>
            <Select id={id} onChange={onChange} options={options}/>
        </div>
    );
};

export default SelectWrapper;