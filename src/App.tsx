import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import DetalisScreen from './components/DetalisScreen';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path={['/p=:id', '/']} component={MainScreen} />
          <Route exact path='/detail/:code' component={DetalisScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
