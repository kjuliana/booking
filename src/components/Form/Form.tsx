import React, {useEffect, useState} from 'react';
import styles from './Form.module.css';
import SelectWrapper from "../SelectWrapper/SelectWrapper";
import TextAreaWrapper from "../TextAreaWrapper/TextAreaWrapper";
import Button from "../UI/Button/Button";
import TotalCard from "../TotalCard/TotalCard";
import {IFormData} from "../../models/models";

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


const getEndTime = (startTime: string, intervalMs: number): string => {
    const [hour, minute] = startTime.split(':');
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return timeToString(new Date(date.getTime() + intervalMs));
}

const TIME_STEP_MS = 1000*60*15;

const Form = () => {

    const initialStart = new Date(Math.ceil(Date.now() / TIME_STEP_MS) * TIME_STEP_MS);

    const initialFormState:  IFormData = {
        tower: 'A',
        floor: '1',
        room: '1',
        date: dateToString(initialStart),
        timeStart: timeToString(initialStart),
        timeEnd: timeToString(new Date (initialStart.getTime() + 30 * 60 * 1000)),
        comment: '',
    }

    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        const newTimeEnd = getEndTime(formState.timeStart,30 * 60 * 1000);
        setFormState(prevFormState => ({...prevFormState, timeEnd: newTimeEnd}));
    }, [formState.timeStart, formState.date])

    return (
        <div className={styles.root}>
            <h1>Бронирование переговорных комнат</h1>
            <div className={styles.content}>
                <div className={styles.column}>
                    <SelectWrapper
                        currentValue={formState.tower}
                        key={'tower'}
                        id={'tower'}
                        onChange={(newValue) => setFormState({...formState, tower: newValue})}
                        options={['A', 'B']}
                        title={'Башня'}
                    />
                    <SelectWrapper
                        currentValue={formState.floor}
                        key={'floor'}
                        id={'floor'}
                        onChange={(newValue) => setFormState({...formState, floor: newValue})}
                        options={['3', '4', '5', '6', '7', '8']}
                        title={'Этаж'}
                    />
                    <SelectWrapper
                        currentValue={formState.room}
                        key={'room'}
                        id={'room'}
                        onChange={(newValue) => setFormState({...formState, room: newValue})}
                        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                        title={'Переговорка'}
                    />
                    <TextAreaWrapper
                        value={formState.comment}
                        id={'comment'}
                        onChange={(newValue) => setFormState({...formState, comment: newValue})}
                        title={'Комментрий'}
                    />
                </div>
                <div className={styles.column}>
                    {/*<div>*/}
                    {/*    <label htmlFor={'date'}>Дата</label>*/}
                    {/*    <input*/}
                    {/*        id={'date'}*/}
                    {/*        type='date'*/}
                    {/*        value={formState.date}*/}
                    {/*        min={dateToString(initialStart)}*/}
                    {/*        onChange={(e) => setFormState({...formState, date: e.target.value})}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label htmlFor={'timeStart'}>Время начала</label>*/}
                    {/*    <input*/}
                    {/*        id={'timeStart'}*/}
                    {/*        type='time'*/}
                    {/*        value={formState.timeStart}*/}
                    {/*        onChange={(e) => {*/}
                    {/*            setFormState({...formState, timeStart: e.target.value})*/}
                    {/*        }}*/}
                    {/*        step={900}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label htmlFor={'timeEnd'}>Время окончания</label>*/}
                    {/*    <input*/}
                    {/*        id={'timeEnd'}*/}
                    {/*        type='time'*/}
                    {/*        value={formState.timeEnd}*/}
                    {/*        onChange={(e) => {*/}
                    {/*            setFormState({...formState, timeEnd: e.target.value})*/}
                    {/*        }}*/}
                    {/*        step={900}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <input
                            id={'date'}
                            type='date'
                            value={formState.date}
                            min={dateToString(initialStart)}
                            onChange={(e) => setFormState({...formState, date: e.target.value})}
                        />
                        <input
                            id={'timeStart'}
                            type='time'
                            value={formState.timeStart}
                            onChange={(e) => {
                                setFormState({...formState, timeStart: e.target.value})
                            }}
                            step={900}
                        />
                        <span> - </span>
                        <input
                            id={'timeEnd'}
                            type='time'
                            value={formState.timeEnd}
                            onChange={(e) => {
                                setFormState({...formState, timeEnd: e.target.value})
                            }}
                            step={900}
                        />
                    </div>
                    <TotalCard data={formState}/>
                    <Button
                        type={'service'}
                        name={'Очистить'}
                        onClick={() => setFormState({...initialFormState})}
                    />
                </div>
            </div>
                <Button
                    type={'main'}
                    name={'Отправить'}
                    onClick={() => console.log(formState)}
                />
        </div>
    );
};

export default Form;