import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps {
    id: string,
    onChange: (newValue: string) => void,
    value: string,
    placeholder: string
}

const TextArea = ({id, value, placeholder, onChange}: TextAreaProps) => {
    return (
        <textarea
            className={styles.root}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        >
        </textarea>
    );
};

export default TextArea;