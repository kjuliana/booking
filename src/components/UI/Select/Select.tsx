import React from 'react'
import styles from './Select.module.css';

interface SelectProps {
    currentValue: string,
    options: string[],
    onChange: (newValue: string)=>void,
    id: string
}

const Select = ({options, currentValue, id, onChange}: SelectProps) => {
    return (
        <select
            id={id}
            name={id}
            onChange={(e) => onChange(e.target.value)}
            value={currentValue}
        >
            {options.map(option =>
                <option
                    className={styles.option}
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            )}
        </select>
    )
}

export default Select;