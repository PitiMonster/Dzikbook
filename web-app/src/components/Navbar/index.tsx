import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authActions } from '../../store/auth/slice';

import classes from './index.module.scss';

import SearchBar from '../SearchBar';
import NotificationsList from './components/Notifications';
import { getUsersByNameSurnameUsername } from '../../store/user/actions';
import { User } from '../../types';
import { ReactNode, useCallback } from 'react';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const searchedUsers = useAppSelector((store) => store.user.searchedUsers);

  const logout = () => {
    dispatch(authActions.logout({}));
  };

  const onSearchTextChange = useCallback(
    (text: string) => {
      dispatch(getUsersByNameSurnameUsername(text));
    },
    [dispatch]
  );
  return (
    <div className={classes.container}>
      <SearchBar
        placeholder="Szukaj na Dzikbooku"
        onSearchTextChange={onSearchTextChange}
        searchResults={searchedUsers}
        mapResults={(user: User, index: number, array: User[]): ReactNode => (
          <li key={user._id}>
            <NavLink to={`/${user._id}`}>
              <p className={classes.searchElement}>
                {`${user.name} ${user.surname}`} {user._id}
              </p>
            </NavLink>
          </li>
        )}
      />
      <div className={classes.buttons}>
        <NavLink exact to={`/${localStorage.getItem('userId')}`}>
          Profil
        </NavLink>
        <NotificationsList />
        <button onClick={logout}>Wyloguj</button>
      </div>
    </div>
  );
};

export default Navbar;
