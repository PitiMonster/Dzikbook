import { useState } from 'react';
import classes from './index.module.scss';

import { Request as RequestType } from '../../../../../../types';

import { answerAquaintanceRequest } from '../../../../../../store/user/actions';

const RequestComponent: React.FC<{ request: RequestType }> = (props) => {
  const [requestResponseInfo, setRequestResponseInfo] = useState<string>('');

  const handleAnswerAquaintanceRequest = async (
    requestId: string,
    answer: string
  ) => {
    const response = await answerAquaintanceRequest(requestId, answer);
    console.log('req answer response:', response);
    switch (response) {
      case 'accepted':
        setRequestResponseInfo('Jesteście teraz znajomymi!');
        break;
      case 'rejected':
        setRequestResponseInfo('Zaproszenie odrzucone.');
        break;
      default:
        break;
    }
  };

  return (
    <li className={classes.container}>
      <p
        className={classes.senderData}
      >{`${props.request.sender.name} ${props.request.sender.surname}`}</p>
      {requestResponseInfo ? (
        <p className={classes.reqResponseText}>{requestResponseInfo}</p>
      ) : (
        <>
          <p className={classes.label}>Wysłał Ci zaproszenie do znajomych</p>
          <div className={classes.buttons}>
            <button
              className={classes.acceptButton}
              onClick={() =>
                handleAnswerAquaintanceRequest(props.request._id, 'accept')
              }
            >
              Akceptuj
            </button>
            <button
              className={classes.declineButton}
              onClick={() =>
                handleAnswerAquaintanceRequest(props.request._id, 'reject')
              }
            >
              Odrzuć
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default RequestComponent;
