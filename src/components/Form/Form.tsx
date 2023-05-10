import React, {useEffect, useMemo, useState} from 'react';
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

const dayToString = (date: Date) => {
    return date.getDay();
}

const parseDateTime = (date: string, time: string): Date => {
    const [hour, minute] = time.split(':');
    const [year, month, day] = date.split('-');

    return new Date(
        Number(year),
        Number(month)- 1,
        Number(day),
        Number(hour),
        Number(minute)
    );
}

const getInterval = (start: Date, end: Date): {hours: number, minutes: number} => {
    const ms = Math.abs(start.getTime() - end.getTime());
    const hours = Math.floor(ms/ MS_IN_HOUR);
    const minutes = ms/ MS_IN_MINUTE % 60;
    return {minutes, hours}
}

const TIME_STEP_MS = 1000*60*15;
const MS_IN_MINUTE = 1000*60;
const MS_IN_HOUR = 1000*60*60;

const week = new Map([
    [1, 'ПН'],
    [2, 'ВТ'],
    [3, 'СР'],
    [4, 'ЧТ'],
    [5, 'ПТ'],
    [6, 'СБ'],
    [7, 'ВС']
]);

const Form = () => {
    const minStart = useMemo(() => new Date(Math.ceil(Date.now() / TIME_STEP_MS) * TIME_STEP_MS), []);
    // const initialEnd = useMemo(() => new Date(initialStart.getTime() + 30 * 60 * 1000), [initialStart]);

    const initialFormState:  IFormData = useMemo(() => ({
        tower: '',
        floor: '',
        room: '',
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        comment: '',
    }), [])

    const [formState, setFormState] = useState(initialFormState);

    let weekDayStart = dayToString(new Date(formState.dateStart));
    let weekDayEnd = dayToString(new Date(formState.dateEnd));

    const interval = getInterval(
        new Date(formState.dateEnd + ' ' + formState.timeEnd),
        new Date(formState.dateStart + ' ' + formState.timeStart)
    );

    useEffect(() => {
        if (!formState.timeStart) {
            setFormState(prevFormState => ({...prevFormState, timeStart: timeToString(minStart)}))
        } else {
            const newStart = (new Date(formState.dateStart + ' ' + formState.timeStart));
            if (minStart.getTime() > newStart.getTime()) {
                setFormState(prevFormState => ({
                    ...prevFormState,
                    timeStart: timeToString(minStart)
                }))
            }
        }
    }, [formState.timeStart, formState.dateStart, initialFormState, minStart])

    useEffect(() => {
        setFormState(prevFormState => {
            if (!prevFormState.timeStart || !prevFormState.timeEnd) {
                return {...prevFormState, dateEnd: prevFormState.dateStart}
            }

            const end = parseDateTime(prevFormState.dateStart, prevFormState.timeEnd);
            const start = parseDateTime(prevFormState.dateStart, prevFormState.timeStart);

            if (start <= end) {
                return {...prevFormState, dateEnd: prevFormState.dateStart}
            }

            const newEnd = start;
            newEnd.setDate(newEnd.getDate() + 1);
            return {...prevFormState, dateEnd: dateToString(newEnd)}
        })

    }, [formState.timeEnd, formState.dateStart, formState.timeStart])

    return (
        <div className={styles.root}>
            <div className={styles.contentWrapper}>
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
                        <div className={styles.fieldDate}>
                            <input
                                className={styles.dateInput}
                                id={'date'}
                                type='date'
                                value={formState.dateStart}
                                min={dateToString(minStart)}
                                onChange={(e) => setFormState({...formState, dateStart: e.target.value})}
                            />
                            <span>{week.get(weekDayStart)}</span>
                            {(Boolean(formState.dateStart) && formState.dateStart !== formState.dateEnd) &&
                            <span className={styles.muteText}> — {formState.dateEnd.split('-').reverse().join('.')} {week.get(weekDayEnd)}</span>
                            }
                        </div>
                        <div hidden={!formState.dateStart} className={styles.fieldDate}>
                            <input
                                className={styles.timeInput}
                                id={'timeStart'}
                                type='time'
                                value={formState.timeStart}
                                onChange={(e) => setFormState({...formState, timeStart: e.target.value})}
                                step={900}
                            />
                            <span className={styles.muteText}> — </span>
                            <input
                                className={styles.timeInput}
                                id={'timeEnd'}
                                type='time'
                                value={formState.timeEnd}
                                onChange={(e) => setFormState({...formState, timeEnd: e.target.value})}
                                step={900}
                            />
                            {(formState.timeEnd && Boolean(interval.minutes || interval.hours)) &&
                            <span>
                                    {interval.hours > 0 && ' ' + interval.hours + ' ч. '}
                                {' ' + interval.minutes} мин.
                                </span>
                            }
                        </div>
                    </div>
                    <TextArea
                        value={formState.comment}
                        id={'comment'}
                        onChange={(newValue) => setFormState({...formState, comment: newValue})}
                        placeholder={'Комментарий'}
                    />
                </div>
            </div>
            <div className={styles.actions}>
                <Button
                    type={'service'}
                    name={'Очистить'}
                    onClick={() => setFormState({...initialFormState})}
                />
                <Button
                    disabled={!formState.tower || !formState.floor || !formState.room || !formState.dateStart || !formState.timeStart || !formState.timeEnd}
                    type={'main'}
                    name={'Отправить'}
                    onClick={() => console.log(formState)}
                />
            </div>
        </div>
    );
};

export default Form;