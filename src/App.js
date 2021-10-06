
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import CurrenCity from './components/CurrentCity';
import MainHeader from './components/MainHeader';

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/favorites' exact>
          <Favorites />
        </Route>
        <Route path = '/city/:name' exact>
          <CurrenCity />
        </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
