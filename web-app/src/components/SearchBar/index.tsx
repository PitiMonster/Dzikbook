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
}> = ({
  placeholder,
  onSearchTextChange,
  searchResults,
  mapResults,
  timeout,
  searchNavLinkTo,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<ReactNode[]>([]);

  // sending search request
  useEffect(() => {
    const timerToSendSearchReq: ReturnType<typeof setTimeout> = setTimeout(
      () => {
        // dispatch(getUsersByNameSurnameUsername(searchText));
        onSearchTextChange(searchText);
      },
      timeout ?? 500
    );
    return () => {
      clearTimeout(timerToSendSearchReq);
    };
  }, [searchText, onSearchTextChange, timeout]);

  useEffect(() => {
    const newResults: ReactNode[] = searchResults.map(mapResults);
    setResults(newResults);
  }, [searchResults, mapResults]);

  return (
    <div className={classes.container}>
      <input
        className={classes.searchInput}
        placeholder={placeholder}
        value={searchText}
        onChange={(event) => {
          console.log('zmieniam');
          setSearchText(event.currentTarget.value);
        }}
      />
      <ul className={classes.resultsList}>
        {results}
        <li>
          <NavLink to={searchNavLinkTo ?? ''}>
            <p className={classes.searchLink}>Wyszukaj...</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SearchBar;
