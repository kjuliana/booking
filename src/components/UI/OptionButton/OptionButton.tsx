import React from 'react';
import styles from './OptionButton.module.css';

interface OptionButtonProps {
    name: string,
    onClick(event: React.MouseEvent): void,
}

const OptionButton = ({name, onClick}: OptionButtonProps) => {
    return (
        <button onClick={onClick}>
            {name}
        </button>
    );
};

export default OptionButton;