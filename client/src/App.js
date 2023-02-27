import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import PokemonDetail from './components/PokemonDetail';
import PokemonCreate from './components/PokemonCreate'

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/home/:id' component={PokemonDetail} />
        <Route exact path='/create' component={PokemonCreate}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
