import React, {useEffect, useState} from 'react';
import styles from './Form.module.css';
import SelectWrapper from "../SelectWrapper/SelectWrapper";
import TextAreaWrapper from "../TextAreaWrapper/TextAreaWrapper";
import Button from "../UI/Button/Button";
import Intervals from "../Intervals/Intervals";
import TotalCard from "../TotalCard/TotalCard";
import {IFormData} from "../../models/models";

const Form = () => {
    const now = new Date();
    const minMinutes = (Math.ceil((now.getMinutes() + 1) / 15) * 15) % 60;
    const minHours = minMinutes === 0 ? now.getHours() + 1 : now.getHours();
    const minDate = now.toLocaleDateString("fr-CA", {year:"numeric", month: "2-digit", day:"2-digit"})

    const getEndTime = (startMs: number, intervalMs: number):string => {
        const endMs = startMs + intervalMs;
        const endDate = new Date(endMs);
        const minutes = endDate.getMinutes();
        const endMinutes = minutes > 9 ? minutes : '0'+minutes;
        return endDate.getHours() + ':' + endMinutes;
    }

    const initialFormState:  IFormData = {
        tower: 'A',
        floor: '1',
        room: '1',
        date: minDate,
        timeStart: minHours+':'+minMinutes,
        timeEnd: minHours+':'+minMinutes,
        comment: '',
    }

    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        const startMoment = new Date(formState.date + ' ' + formState.timeStart).getTime();
        const newTimeEnd = getEndTime(startMoment,30 * 60 * 1000);
        setFormState(prevFormState => ({...prevFormState, timeEnd: newTimeEnd}));
    }, [formState.timeStart, formState.date])

    return (
        <div className={styles.root}>
            <h1>Бронирование переговорных комнат</h1>
            <div className={styles.content}>
                <div className={styles.column}>
                    <SelectWrapper
                        key={'tower'}
                        id={'tower'}
                        onChange={(newValue) => setFormState({...formState, tower: newValue})}
                        options={['A', 'B']}
                        title={'Башня'}
                    />
                    <SelectWrapper
                        key={'floor'}
                        id={'floor'}
                        onChange={(newValue) => setFormState({...formState, floor: newValue})}
                        options={['3', '4', '5', '6', '7', '8']}
                        title={'Этаж'}
                    />
                    <SelectWrapper
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
                    <input
                        type='date'
                        value={formState.date}
                        min={formState.date}
                        onChange={(e) => setFormState({...formState, date: e.target.value})}
                    />
                    <input
                        type='time'
                        value={formState.timeStart}
                        onChange={(e) => {
                            setFormState({...formState, timeStart: e.target.value})
                        }}
                        step={900}
                    />
                    <Intervals
                        intervals={[30, 60, 120]}
                        onChange={(value) => {
                            const startMoment = new Date(formState.date + ' ' + formState.timeStart).getTime();
                            const newTimeEnd = getEndTime(startMoment,value * 60 * 1000);
                            setFormState(prevFormState => ({...prevFormState, timeEnd: newTimeEnd}));
                        }}
                    />
                    <TotalCard data={formState}/>
                </div>
            </div>
            <Button name={'Отправить'} onClick={() => console.log(formState)}/>
        </div>
    );
};

export default Form;