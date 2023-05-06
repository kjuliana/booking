import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    name: String,
    onClick(event: React.MouseEvent): void,
}

const Button = ({name, onClick}: ButtonProps) => {
    return (
        <button onClick={onClick}>
            {name}
        </button>
    );
};

export default Button;