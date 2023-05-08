import React from 'react';
import {behaviorPlugin} from "@testing-library/user-event/dist/keyboard/types";

interface TextAreaProps {
    id: string,
    onChange: (newValue: string) => void,
    value: string
}

const TextArea = ({id, value, onChange}: TextAreaProps) => {
    return (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)}>

        </textarea>
    );
};

export default TextArea;