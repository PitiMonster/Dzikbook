import { useEffect, useState } from 'react';

import { Message as MessageType } from '../../../../../../types';
import classes from './index.module.scss';

const Message: React.FC<{ message: MessageType }> = (props) => {
  const [messageClasses, setMessageClasses] = useState<string[]>([
    classes.message,
  ]);

  useEffect(() => {
    if (props.message.author._id === localStorage.getItem('userId')) {
      setMessageClasses((curr) => [curr[0], classes.authorMe]);
    } else setMessageClasses((curr) => [curr[0], classes.authorOther]);
  }, [props.message.author._id]);

  return <div className={messageClasses.join(' ')}>{props.message.text}</div>;
};

export default Message;
