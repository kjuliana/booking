import React from 'react';
import {IFormData} from "../../models/models";


interface TotalCardProps {
    data: IFormData
}

const TotalCard = ({data}: TotalCardProps) => {
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
                Интервал 30 минут
            </div>
        </div>
    );
};

export default TotalCard;