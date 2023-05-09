import React, {useEffect, useState} from 'react';
import styles from './Form.module.css';
import FieldSelect from "../FieldSelect/FieldSelect";
import Button from "../UI/Button/Button";
import {IFormData} from "../../models/models";
import TextArea from "../UI/TextArea/TextArea";

const dateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth()+1+'').padStart(2, '0');
    const day = (date.getDate()+'').padStart(2, '0')
    return `${year}-${month}-${day}`;
}

const timeToString = (date: Date) => {
    const hours = (date.getHours()+'').padStart(2, '0');
    const minutes = (date.getMinutes()+'').padStart(2, '0');
    return `${hours}:${minutes}`;
}


const getEndTime = (startTime: string, startDate: string, intervalMs: number): Date => {
    const [hour, minute] = startTime.split(':');
    const [year, month, day] = startDate.split('-');
    const date = new Date(
        Number(year),
        Number(month)- 1,
        Number(day),
        Number(hour),
        Number(minute)
    );

    return new Date(date.getTime() + intervalMs);
}

const getDiffMs = (start: Date, end: Date): number => {
    return Math.abs(start.getTime() - end.getTime())
}

const TIME_STEP_MS = 1000*60*15;

const Form = () => {

    const initialStart = new Date(Math.ceil(Date.now() / TIME_STEP_MS) * TIME_STEP_MS);
    const initialEnd = new Date (initialStart.getTime() + 30 * 60 * 1000);

    const initialFormState:  IFormData = {
        tower: 'A',
        floor: '1',
        room: '1',
        dateStart: dateToString(initialStart),
        dateEnd: dateToString(initialEnd),
        timeStart: timeToString(initialStart),
        timeEnd: timeToString(initialEnd),
        comment: '',
    }

    const [formState, setFormState] = useState(initialFormState);

    const intervalMs = getDiffMs(
        new Date(formState.dateEnd + ' ' + formState.timeEnd),
        new Date(formState.dateStart + ' ' + formState.timeStart)
    );

    const intervalHours = Math.floor(intervalMs/ 1000/ 60 / 60);
    const intervalMinutes = intervalMs/1000/ 60 % 60;

    useEffect(() => {
        const newStart = (new Date(formState.dateStart + ' ' + formState.timeStart));
        if (initialStart.getTime() > newStart.getTime()) {
            setFormState(prevFormState => ({
                ...prevFormState,
                timeStart: initialFormState.timeStart,
                timeEnd: initialFormState.timeEnd,
                dateStart: initialFormState.dateStart,
                dateEnd: initialFormState.dateEnd
            }))
        } else {
            const newEnd = getEndTime(formState.timeStart, formState.dateStart, 1000*60*30);
            const newTimeEnd = timeToString(newEnd);
            const newDateEnd = dateToString(newEnd);
            setFormState(prevFormState => ({...prevFormState, timeEnd: newTimeEnd, dateEnd: newDateEnd}));
        }
    }, [formState.timeStart, formState.dateStart])

    useEffect(() => {
        const [newEndHour, newEndMinute] = formState.timeEnd.split(':');
        const [startHour, startMinute] = formState.timeStart.split(':');
        const [year, month, day] = formState.dateEnd.split('-');

        if (startHour < newEndHour || (newEndHour === startHour && newEndMinute > startMinute)) {
            setFormState(prevFormState => ({...prevFormState, dateEnd: formState.dateStart}));
        } else if (formState.dateStart === formState.dateEnd) {
            const newEndDate =  new Date(new Date(
                Number(year),
                Number(month)- 1,
                Number(day),
                Number(newEndHour),
                Number(newEndMinute)
            ).getTime() + 1000*60*60*24);
            setFormState(prevFormState => ({...prevFormState, dateEnd: dateToString(newEndDate)}));
        }
    }, [formState.timeEnd])

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Бронирование переговорки</h1>
            <div className={styles.content}>
                    <div className={styles.themeWrapper}>
                        <h3 className={styles.themeTitle}>Где</h3>
                        <FieldSelect
                            currentValue={formState.tower}
                            key={'tower'}
                            id={'tower'}
                            onChange={(newValue) => setFormState({...formState, tower: newValue})}
                            options={['A', 'B']}
                            title={'Башня'}
                        />
                        <FieldSelect
                            currentValue={formState.floor}
                            key={'floor'}
                            id={'floor'}
                            onChange={(newValue) => setFormState({...formState, floor: newValue})}
                            options={['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
                                '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27']}
                            title={'Этаж'}
                        />
                        <FieldSelect
                            currentValue={formState.room}
                            key={'room'}
                            id={'room'}
                            onChange={(newValue) => setFormState({...formState, room: newValue})}
                            options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                            title={'Переговорка'}
                        />
                    </div>
                    <div className={styles.themeWrapper}>
                        <h3 className={styles.themeTitle}>Когда</h3>
                        <div>
                            <input
                                className={styles.dateInput}
                                id={'date'}
                                type='date'
                                value={formState.dateStart}
                                min={dateToString(initialStart)}
                                onChange={(e) => setFormState({...formState, dateStart: e.target.value})}
                            />
                            {formState.dateStart !== formState.dateEnd &&
                            <span> ➜ {formState.dateEnd.split('-').reverse().join('.')}</span>
                            }
                        </div>
                        <div>
                            <input
                                className={styles.timeInput}
                                id={'timeStart'}
                                type='time'
                                value={formState.timeStart}
                                onChange={(e) => setFormState({...formState, timeStart: e.target.value})}
                                step={900}
                            />
                            <span> ➜ </span>
                            <input
                                className={styles.timeInput}
                                id={'timeEnd'}
                                type='time'
                                value={formState.timeEnd}
                                onChange={(e) => setFormState({...formState, timeEnd: e.target.value})}
                                step={900}
                            />
                            <span>
                                {intervalHours > 0 && ' ' + intervalHours + ' ч. '}
                                    {' ' + intervalMinutes} мин.
                            </span>
                        </div>
                    </div>
                    <TextArea
                        value={formState.comment}
                        id={'comment'}
                        onChange={(newValue) => setFormState({...formState, comment: newValue})}
                        placeholder={'Комментарий'}
                    />
            </div>
            <div className={styles.actions}>
                <Button
                    type={'service'}
                    name={'Очистить'}
                    onClick={() => setFormState({...initialFormState})}
                />
                <Button
                    type={'main'}
                    name={'Отправить'}
                    onClick={() => console.log(formState)}
                />
            </div>
        </div>
    );
};

export default Form;