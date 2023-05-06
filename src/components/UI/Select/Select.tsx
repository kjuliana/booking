import React from 'react'
import styles from './Select.module.css';

interface SelectProps {
    options: String[]
}

const Select = ({options}: SelectProps) => {
    return (
        <select>
            {options.map(option => <option className={styles.option} key={''+option}>{option}</option>)}
        </select>
    )
}

export default Select;