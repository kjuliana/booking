import React from 'react';
import {IFormData} from "../../models/models";


interface TotalCardProps {
    data: IFormData
}

const getDiffMs = (start: Date, end: Date): number => {
    return Math.abs(start.getTime() - end.getTime())
}

const TotalCard = ({data}: TotalCardProps) => {

    let intervalMinutes = getDiffMs(
        new Date(data.date + ' ' + data.timeEnd),
        new Date(data.date + ' ' + data.timeStart)
    )/1000/60;

    let intervalHours = 0;

    if (intervalMinutes > 59) {
        intervalHours = Math.floor(intervalMinutes / 60);
        intervalMinutes = intervalMinutes % 60;
    }

    return (
        <div>
            <div>
                Башня {data.tower}
            </div>
            <div>
                Этаж {data.floor}
            </div>
            <div>
                Переговорка {data.room}
            </div>
            <div>
                Комментарий {data.comment}
            </div>
            <div>
                Дата {data.date}
            </div>
            <div>
                Время {data.timeStart} - {data.timeEnd}
            </div>
            <div>
                Интервал
                {intervalHours > 0 && ' ' + intervalHours + ' ч. '}
                {' ' + intervalMinutes} мин.
            </div>
        </div>
    );
};

export default TotalCard;