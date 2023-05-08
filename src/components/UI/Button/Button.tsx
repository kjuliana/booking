import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    name: string,
    onClick(event: React.MouseEvent): void,
    type: 'main' | 'service'
}

const Button = ({name, onClick, type}: ButtonProps) => {
    const className = styles.root + ' ' + styles[type]
    return (
        <button className={className} onClick={onClick}>
            {name}
        </button>
    );
};

export default Button;