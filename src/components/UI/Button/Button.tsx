import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    name: string,
    onClick?(event: React.MouseEvent): void,
    intent: 'main' | 'service',
    type?: 'button' | 'submit',
    disabled?: boolean,
}

const Button = ({name, onClick, type = 'button', intent, disabled}: ButtonProps) => {
    const className = styles.root + ' ' + styles[intent]
    return (
        <button type={type} disabled={disabled} className={className} onClick={onClick}>
            {name}
        </button>
    );
};

export default Button;