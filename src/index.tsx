import ReactDOM from 'react-dom';
import { App } from './App';
import { ToDoProvider } from './providers/TodoProvider';

ReactDOM.render(<ToDoProvider><App /></ToDoProvider>, document.getElementById('root'));
