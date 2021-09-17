import { useRef, useState, useEffect } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { authActions } from '../../store/auth/slice';
import { createPost } from '../../store/post/actions';
import { getUsersByNameSurnameUsername } from '../../store/user/actions';
import { runNotificationSocketListeners } from '../../store/notification/actions';
import { User } from '../../types';
import {
  runSocket,
  setDispatch,
  runListener,
  runEmitter,
} from '../../websockets';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const routeMatch = useRouteMatch();
  const postInputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>('');

  const userId = useAppSelector((store) => store.me._id);
  const searchedUsers = useAppSelector((store) => store.user.searchedUsers);

  const [searchResults, setSearchResults] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[]
  >([]);

  // useEffect(() => {
  //   runSocket();
  //   setDispatch(dispatch);

  // }, [dispatch, userId]);

  // sending search request
  useEffect(() => {
    const timerToSendSearchReq: ReturnType<typeof setTimeout> = setTimeout(
      () => {
        dispatch(getUsersByNameSurnameUsername(searchText));
      },
      500
    );
    return () => {
      clearTimeout(timerToSendSearchReq);
    };
  }, [searchText, dispatch]);

  // creating list of search results
  useEffect(() => {
    const newSearchResults: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[] = searchedUsers.map((user: User) => (
      <NavLink to={`/${user._id}`} key={user._id}>
        <p>{`${user.name} ${user.surname}`}</p>
      </NavLink>
    ));
    setSearchResults(newSearchResults);
  }, [searchedUsers, routeMatch.path]);

  const logout = () => {
    dispatch(authActions.logout({}));
  };

  const createNewPost = () => {
    const text = postInputRef.current!.value;
    dispatch(createPost(text, userId));
  };

  const onChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setSearchText(newValue);
  };

  const goToSearchResults = () => {
    // go to page with list of search results
    console.log('go to search results page');
  };

  return (
    <div>
      <p>Siema zalogowano!</p>
      <NavLink exact to={`/${localStorage.getItem('userId')}`}>
        Profil
      </NavLink>
      <button onClick={logout}>Wyloguj</button>
      <label>
        <p>Dodaj posta</p>
        <input placeholder="Co tam u Ciebie słychać?" ref={postInputRef} />
      </label>
      <button onClick={createNewPost}>Dodaj post</button>
      <label>
        <input
          placeholder="Szukaj na Dzikbooku"
          value={searchText}
          onChange={onChangeSearchText}
        />
      </label>
      <button onClick={goToSearchResults}>Wyszukaj</button>
      {searchResults}
    </div>
  );
};

export default MainPage;
