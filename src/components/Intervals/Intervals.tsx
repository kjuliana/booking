import React from 'react';
import OptionButton from "../UI/OptionButton/OptionButton";

interface IntervalsProps {
    intervals: Number[]
}

const Intervals = ({intervals}: IntervalsProps) => {
    return (
        <div>
            {intervals.map(interval => <OptionButton key={interval+''} name={interval+ ' минут'} onClick={()=>{}}/>)}
        </div>
    );
};

export default Intervals;