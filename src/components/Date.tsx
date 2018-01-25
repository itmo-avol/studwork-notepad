import * as React from 'react';
import * as moment from 'moment';
import { NoteElement } from '../App';

interface AppProps {
    notes: NoteElement[];
    activeId: number;
}

export default class App extends React.Component<AppProps, any> {
  render() {
    let result = <p>{moment.now()}</p>;
    if (this.props.notes[this.props.activeId]) {
      result = <p>{(this.props.notes[this.props.activeId].date).fromNow()}</p>;
    } else {
      result = <p>&nbsp;</p>;
    }
    return (
      <div>
          {result}
      </div>
    );
  }
}
