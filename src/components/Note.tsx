import * as React from 'react';

interface NoteProps {
    id: number;
    title: string;
    text: string;
    onNoteClickHandle(e: React.SyntheticEvent<HTMLLIElement>): void;
    onOpenNote(id: number): void;
}

class Note extends React.Component<NoteProps, {}> {

    constructor(props: NoteProps) {
        super(props);
    }

    onClickHandle = (e: React.SyntheticEvent<HTMLLIElement>) => {
        this.props.onNoteClickHandle(e); // добавляем класс активной заметки
        this.props.onOpenNote(this.props.id); // открываем в textarea (меняем activeID)
    }

    render() {
        return (
            <li className="note" onClick={(e) => this.onClickHandle(e)}>
                <dl>
                    <dt>{this.props.title}</dt>
                    <dd>{this.props.text.slice(0, 100)}</dd>
                </dl>
            </li>
        );
    }
}

export default Note;