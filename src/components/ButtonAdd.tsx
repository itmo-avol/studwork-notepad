import * as React from 'react';
import { NoteElement } from '../App';
import * as moment from 'moment';

export interface ButtonAddProps {
    onAdd(note: NoteElement): void;
}

export default class ButtonAdd extends React.Component < ButtonAddProps, any > {

    /** Функция создания новой заметки */
    onClickHandle = (e: React.SyntheticEvent<HTMLLIElement>) => {
        let newTitle: string | null = prompt('Enter note title', 'Без имени'); 
        if (newTitle === null || newTitle === '') {
            newTitle = 'Без имени';
        }

        const newNote: NoteElement = {
            title: newTitle,
            text: '',
            date: moment(new Date())
        };
        this.props.onAdd(newNote);
    }

    render() {
        return (
            <li className="note note-add" onClick={(e) => this.onClickHandle(e)}>📝 Add new note</li>
        );
    }
}