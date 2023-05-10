import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    name: string,
    onClick(event: React.MouseEvent): void,
    type: 'main' | 'service',
    disabled?: boolean,
}

const Button = ({name, onClick, type, disabled}: ButtonProps) => {
    const className = styles.root + ' ' + styles[type]
    return (
        <button disabled={disabled} className={className} onClick={onClick}>
            {name}
        </button>
    );
};

export default Button;