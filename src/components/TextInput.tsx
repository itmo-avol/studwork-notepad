import * as React from 'react';
import { NoteElement } from '../App';
import * as moment from 'moment';

interface TextInputProps {
    notes: NoteElement[];
    activeId: number;
}

interface TextInputState {
    value: string;
    disabled: boolean;
}

class TextInput extends React.Component<TextInputProps, TextInputState> {

    constructor(props: TextInputProps) {
        super(props);
        this.state = {
            value: '',
            disabled: false
        };
    }
    
    /** Здесь мы обновляем текст в textarea в зависимости от активной заметки
     * Этот метод перехватывает компонент перед рендером в момент, когда он получает новые props (nextProps)
     * Cтарые props доступны через this.props
     */
    componentWillReceiveProps (nextProps: TextInputProps) {
        const activeNote: HTMLLIElement | null = document.querySelector('.note--active') as HTMLLIElement;
        // Если больше не осталось заметок, на странице нет активной заметки и в списке активного элемента тоже нет, то загружаем текст новой активной заметки 
        if (nextProps.activeId !== -1 && activeNote !== null && nextProps.notes[nextProps.activeId] !== undefined) {
            this.setState({
                value: nextProps.notes[nextProps.activeId].text,
            });
        } else {
            if (nextProps.notes.length === 0) {
                this.setState({ disabled: true });
            }
            this.setState({
                value: ''
            });
        }
    }

    /** Редактирование заметки */
    onTextChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const { notes, activeId } = this.props; 
        const { value } = e.currentTarget; 

        if (notes[activeId]) {
            this.setState({
                value: value
            });
            notes[activeId].text = value;
            notes[activeId].date = moment(new Date());
        } else {
            this.setState({
                value: ''
            });
        }
    }

    render() {
        return (
            <textarea
                value={this.state.value}
                onChange={(e) => this.onTextChange(e)}
                disabled={this.state.disabled}
            />
        );
    }
}

export default TextInput;
