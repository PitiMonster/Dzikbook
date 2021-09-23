import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import classes from './index.module.scss';

import { getReceivedRequests } from '../../../../store/notification/actions';
import { Request as RequestType } from '../../../../types';
import Request from './components/Request';

const NotificaionsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const requestList = useAppSelector(
    (state) => state.notification.receivedRequests
  );

  const [receivedRequests, setReceivedRequests] = useState<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >[]
  >([]);

  const createRequestsList = useCallback(
    (requests: RequestType[]) =>
      requests.map((request) => (
        <Request key={request._id} request={request} />
      )),
    []
  );

  useEffect(() => {
    dispatch(getReceivedRequests());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      setReceivedRequests(createRequestsList(requestList));
    })();
  }, [requestList, createRequestsList]);

  return (
    <div className={classes.container}>
      <span className={classes.icon}>N</span>
      <div className={classes.notificationsListContainer}>
        <h4>Powiadomienia</h4>
        <ul className={classes.notificationsList}>{receivedRequests}</ul>
      </div>
    </div>
  );
};

export default NotificaionsList;
