import * as React from 'react';
import './App.css';
import * as moment from 'moment';

import TextInput from './components/TextInput';
import NotesList from './components/NotesList';
import Date from './components/Date';

interface AppState {
  notes: NoteElement[];
  activeId: number;
}

export interface NoteElement {
  title: string;
  text: string;
  date: moment.Moment; // дата последнего изменения заметки
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      notes: [
        {
          date: moment('2016-03-01', 'YYYY-MM-DD'),
          text: 'Однако, исследователи постоянно сталкиваются с тем, что парадигма иллюстрирует комплекс. Онтогенез речи иллюстрирует онтогенез речи. Акцентуированная личность отчуждает конвергентный тест.',
          title: 'Первая заметка'
        },
        {
          date: moment('2018-01-18', 'YYYY-MM-DD'),
          text: 'Текст второй заметки',
          title: 'Вторая заметка с длинным названием, которое не помещается'
        },
        {
          date: moment('2018-01-25', 'YYYY-MM-DD'),
          text: 'Когнитивная составляющая аннигилирует сублимированный психоанализ. Стимул притягивает конформизм. Психическая саморегуляция понимает потребительский гомеостаз. Действие, конечно, просветляет страх, и это неудивительно, если речь о персонифицированном характере первичной социализации.',
          title: 'Социальный эскапизм в XXI веке'
        },
      ],
      activeId: -1
    };
  }

  /** Функция добавления новой заметки в конец списка */
  onAddNote = (note: NoteElement) => {
    this.setState({
      notes: [...this.state.notes, note],
      activeId: this.state.notes.length
    });
  }
  
  /** Функция устанавливает активную заметку */
  onOpenNote = (id: number) => {
    this.setState({
      activeId: id
    });
  }

  /** Функция удаления активной заметки из списка  */
  onRemoveNote = () => {
    if (this.state.activeId !== -1) {
      const activeNote: HTMLLIElement | null = document.querySelector('.note--active') as HTMLLIElement;
      if (activeNote !== null) {
        activeNote.classList.remove('note--active');
      }
      this.setState(prevState => ({
        notes: [...prevState.notes.slice(0, prevState.activeId), ...prevState.notes.slice(prevState.activeId + 1)],
        activeId: -1,
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <NotesList
          notes={this.state.notes}
          onOpenNote={this.onOpenNote}
          onAdd={this.onAddNote}
        />

        <div className="edit-note"> 
          <header>
            <Date notes={this.state.notes} activeId={this.state.activeId}/>
            <button type="button" onClick={this.onRemoveNote}>🗑️</button>
          </header>
          <TextInput
            notes={this.state.notes}
            activeId={this.state.activeId}
          />
        </div>

      </div>
    );
  }
}

export default App;
