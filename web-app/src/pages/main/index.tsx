import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { authActions } from '../../store/auth/slice';
import { createPost } from '../../store/post/actions';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const postInputRef = useRef<HTMLInputElement>(null);

  const userId = useAppSelector((store) => store.me.id);

  const logout = () => {
    dispatch(authActions.logout({}));
  };

  const createNewPost = () => {
    const text = postInputRef.current!.value;
    dispatch(createPost(text, userId));
  };

  return (
    <div>
      <p>Siema zalogowano!</p>
      <NavLink exact to="/profile">
        Profil
      </NavLink>
      <button onClick={logout}>Wyloguj</button>
      <label>
        <p>Dodaj posta</p>
        <input placeholder="Co tam u Ciebie słychać?" ref={postInputRef} />
      </label>
      <button onClick={createNewPost}>Dodaj post</button>
    </div>
  );
};

export default MainPage;
