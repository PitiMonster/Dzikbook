import { useRef } from 'react';

import classes from './index.module.scss';

import { useAppDispatch } from '../../../../../../hooks';
import { createPost } from '../../../../../../store/post/actions';

const AddPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const postInputRef = useRef<HTMLInputElement>(null);

  const createNewPost = () => {
    const text = postInputRef.current!.value;
    dispatch(createPost(text, localStorage.getItem('userId')));
  };

  return (
    <div className={classes.container}>
      <label>
        <p>Dodaj posta</p>
        <input placeholder="Co tam u Ciebie słychać?" ref={postInputRef} />
      </label>
      <button onClick={createNewPost}>Dodaj post</button>
    </div>
  );
};

export default AddPost;
