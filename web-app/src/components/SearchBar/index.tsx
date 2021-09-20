import { useState, useEffect, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../types';

import classes from './index.module.scss';

const SearchBar: React.FC<{
  placeholder: string;
  onSearchTextChange: Function;
  searchResults: User[];
  mapResults: (value: User, index: number, array: User[]) => ReactNode;
  timeout?: number;
  searchNavLinkTo?: string;
}> = (props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<ReactNode[]>([]);

  // sending search request
  useEffect(() => {
    const timerToSendSearchReq: ReturnType<typeof setTimeout> = setTimeout(
      () => {
        // dispatch(getUsersByNameSurnameUsername(searchText));
        props.onSearchTextChange(searchText);
      },
      props.timeout ?? 500
    );
    return () => {
      clearTimeout(timerToSendSearchReq);
    };
  }, [searchText, props]);

  useEffect(() => {
    const newResults: ReactNode[] = props.searchResults.map(props.mapResults);
    setResults(newResults);
  }, [props.searchResults, props.mapResults]);

  return (
    <div className={classes.container}>
      <input
        className={classes.searchInput}
        placeholder={props.placeholder}
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
      />
      <ul className={classes.resultsList}>
        {results}
        <li>
          <NavLink to={props.searchNavLinkTo ?? ''}>
            <p className={classes.searchLink}>Wyszukaj...</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SearchBar;
