import React from 'react';
import styles from './SelectWrapper.module.css';
import Select from "../UI/Select/Select";

interface SelectWrapperProps {
    currentValue: string,
    options: string[],
    title: string,
    id: string,
    onChange: (newValue: string)=>void,
}

const SelectWrapper = ({options, currentValue, id, title, onChange}: SelectWrapperProps) => {
    return (
        <div className={styles.root}>
            <label htmlFor={id} className={styles.title}>{title}</label>
            <Select currentValue={currentValue} id={id} onChange={onChange} options={options}/>
        </div>
    );
};

export default SelectWrapper;