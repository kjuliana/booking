import React from 'react';
import TextArea from "../UI/TextArea/TextArea";
import styles from './TextAreaWrapper.module.css';

interface TextAreaWrapperProps{
    title: string,
    onChange: (newValue: string)=>void,
    id: string,
    value: string,
}

const TextAreaWrapper = ({title, value, onChange, id}: TextAreaWrapperProps) => {
    return (
        <div className={styles.root}>
            <label htmlFor={id}>{title}</label>
            <TextArea id={id} value={value} onChange={onChange}/>
        </div>
    );
};

export default TextAreaWrapper;