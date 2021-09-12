import { Switch, Route, Link } from 'react-router-dom';

import AuthPage from './pages/auth';
import MainPage from './pages/main';
import ProfilePage from './pages/profile';
import { useAppSelector } from './hooks';
import GuardRoute from './utils/guardRoute';

import { io } from 'socket.io-client';
import { setTokenSourceMapRange } from 'typescript';

const App: React.FC = () => {
  const isUserLoggedIn = useAppSelector((store) => store.auth.isUserLoggedIn);

  const socket = io('http://localhost:8080', {
    reconnectionDelay: 1000,
    reconnection: true,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  socket.emit('connect to chat', { chatId: '1234' });
  socket.emit('send message', { chatId: '1234', message: 'siema byq' });

  socket.on('new message', (data) => {
    console.log(data);
  });
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
        path="/:userId"
        exact={true}
        Component={ProfilePage}
        isPermitted={isUserLoggedIn}
      />
    </Switch>
  );
};

export default App;
