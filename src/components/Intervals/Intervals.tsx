import React from 'react';
import OptionButton from "../UI/OptionButton/OptionButton";

interface IntervalsProps {
    intervals: number[],
    onChange: (interval: number) => void;
}

const Intervals = ({intervals, onChange}: IntervalsProps) => {
    return (
        <div>
            {intervals.map(interval =>
                <OptionButton
                    key={interval}
                    name={interval + ' минут'}
                    onClick={()=>{onChange(interval)}}
                />
            )}
        </div>
    );
};

export default Intervals;