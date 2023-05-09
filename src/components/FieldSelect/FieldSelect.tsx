import React from 'react';
import styles from './FieldSelect.module.css';
import Select from "../UI/Select/Select";

interface FieldSelectProps {
    currentValue: string,
    options: string[],
    title: string,
    id: string,
    onChange: (newValue: string)=>void,
}

const FieldSelect = ({options, currentValue, id, title, onChange}: FieldSelectProps) => {
    return (
        <div className={styles.root}>
            <label htmlFor={id} className={styles.title}>{title}</label>
            <Select currentValue={currentValue} id={id} onChange={onChange} options={options}/>
        </div>
    );
};

export default FieldSelect;