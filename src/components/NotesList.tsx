import * as React from 'react';
import Note from './Note';
import { NoteElement } from '../App';
import ButtonAdd from './ButtonAdd';

interface NotesListProps {
    notes: NoteElement[];
    onOpenNote(id: number): void;
    onAdd(e: NoteElement): void;
}

class NotesList extends React.Component<NotesListProps, any> {

    constructor(props: NotesListProps) {
        super(props);
    }

    /** Функция добавляет класс активной заметки */
    onNoteClickHandle = (e: React.SyntheticEvent<HTMLLIElement>) => {
        const activeNote: HTMLLIElement | null = document.querySelector('.note--active') as HTMLLIElement;
        if (activeNote !== null) {
            activeNote.classList.remove('note--active');
        }
        e.currentTarget.classList.add('note--active');
    }

    render() {
        let result;

        if (this.props.notes.length > 0) {
            result = this.props.notes.map((note: NoteElement, index) => {
                return (
                    <Note
                        key={index}
                        title={note.title}
                        text={note.text}
                        id={index}
                        onNoteClickHandle={this.onNoteClickHandle}
                        onOpenNote={this.props.onOpenNote}
                    />);
            });
        } else {
            result = null;
        }

        return (
            <div className="notes-container">
                <ul className="notes-list">
                    <ButtonAdd onAdd={this.props.onAdd} />
                    {result}
                </ul>
            </div>
        );
    }
}

export default NotesList;
