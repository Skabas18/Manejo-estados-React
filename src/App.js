import { UseState } from './UseState';
import { UseReducer } from './UseReducer';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"/>
      <UseReducer name= "Use Reducer"/>
    </div>
  );
}

export default App;
