import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import classes from './index.module.scss';
import { useAppSelector, useAppDispatch } from './../../../../../../hooks';
import { getNextTenPosts } from '../../../../../../store/post/actions';
import { Post } from '../../../../../../types';

const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const myPosts = useAppSelector((store) => store.post.cachedPosts);

  const params = useParams<{ userId: string }>();
  const { userId } = params;

  const [postsList, setPostsList] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[]
  >([]);

  useEffect(() => {
    const handleScrollToBottom = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        myPosts.length >= 10
      ) {
        window.removeEventListener('scroll', handleScrollToBottom);
        dispatch(getNextTenPosts(userId, myPosts.length));
      }
    };
    window.addEventListener('scroll', handleScrollToBottom);

    return () => {
      window.removeEventListener('scroll', handleScrollToBottom);
    };
  }, [dispatch, myPosts.length, userId]);

  useEffect(() => {
    if (myPosts) {
      const newPostsList = myPosts.map((post: Post) => {
        const newDate = moment(
          post.createdAt.toString().split('.')[0],
          'YYYY-MM-DD HH:mm'
        ).format('HH:mm YYYY-MM-DD');
        return (
          <li key={post._id} className={classes.postItem}>
            <div className={classes.postData}>
              <h4
                className={classes.postAuthor}
              >{`${post.author.name} ${post.author.surname}`}</h4>
              <p className={classes.postDate}>{newDate}</p>
            </div>
            <p className={classes.postText}>{post.text}</p>
          </li>
        );
      });

      setPostsList(newPostsList);
    }
  }, [myPosts]);

  return <ul className={classes.container}>{postsList}</ul>;
};

export default PostsList;
