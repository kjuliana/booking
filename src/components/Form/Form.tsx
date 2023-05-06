import React, {useState} from 'react';
import styles from './Form.module.css';
import SelectWrapper from "../SelectWrapper/SelectWrapper";
import TextAreaWrapper from "../TextAreaWrapper/TextAreaWrapper";
import Button from "../UI/Button/Button";
import Intervals from "../Intervals/Intervals";

const Form = () => {
    const initialFormState = {
        tower: 'A',
        floor: '3',
        room: '1',
        date: '04.06.2023',
        timeStart: '13:30',
        timeEnd: '14:40',
        comment: '',
    }
    const [formState, setFormState] = useState(initialFormState);

    return (
        <div className={styles.root}>
            <h1>Бронирование переговорных комнат</h1>
            <div className={styles.content}>
                <div className={styles.column}>
                    <SelectWrapper
                        options={['A', 'B']}
                        title={'Башня'}/>
                    <SelectWrapper
                        options={['1', '2', '3', '4']}
                        title={'Этаж'}/>
                    <SelectWrapper
                        options={['1', '2', '3', '4', '5']}
                        title={'Переговорка'}/>
                    <TextAreaWrapper
                        title={'Комментрий'}
                    />
                </div>
                <div className={styles.column}>
                    <input type='date'/>
                    <input type='time'/>
                    <Intervals intervals={[30, 60, 120]}/>
                </div>
            </div>
            <Button name={'Отправить'} onClick={() => console.log(formState)}/>
        </div>
    );
};

export default Form;