import { Switch, Route, Link } from 'react-router-dom';

import AuthPage from './pages/auth';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
    </Switch>
  );
}

export default App;
