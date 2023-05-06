import React from 'react';
import TextArea from "../UI/TextArea/TextArea";

interface TextAreaWrapperProps{
    title: String
}

const TextAreaWrapper = ({title}: TextAreaWrapperProps) => {
    return (
        <div>
            <p>{title}</p>
            <TextArea/>
        </div>
    );
};

export default TextAreaWrapper;