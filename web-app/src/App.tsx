import { Switch, Route, Link } from 'react-router-dom';

import AuthPage from './pages/auth';
import MainPage from './pages/main';
import ProfilePage from './pages/profile';
import { useAppSelector } from './hooks';
import GuardRoute from './utils/guardRoute';

const App: React.FC = () => {
  const isUserLoggedIn = useAppSelector((store) => store.auth.isUserLoggedIn);
  return (
    <Switch>
      {!isUserLoggedIn && (
        <Route path="/" exact>
          <AuthPage />
        </Route>
      )}
      {isUserLoggedIn && (
        <Route path="/" exact>
          <MainPage />
        </Route>
      )}
      <GuardRoute
        path="/profile"
        exact={true}
        Component={ProfilePage}
        isPermitted={isUserLoggedIn}
      />
    </Switch>
  );
};

export default App;
