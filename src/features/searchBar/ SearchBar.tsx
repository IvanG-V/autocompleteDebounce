import React, { useEffect, useRef, useState } from 'react';
import { useDebounceEffect } from './customHoc/useDebounceEffect';
import { RootState, useAppDispatch } from '../../store';
import { loadUsers, reset, setSearch } from '../user/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { User } from '../user/userSlice/types';

export default function SearchBar(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [showSearch, setsShowSearch] = useState<boolean>(true);
  const searchRef = useRef(null);
  const userList = useSelector((store: RootState) => store.user.users);
  const dispatch = useAppDispatch();

  useDebounceEffect(
    () => {
      console.log('make request with query: ', name);
      dispatch(setSearch(name));
      return () => {
        console.log('cancel request with query: ', name);
      };
    },
    [name],
    1000,
  );

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setsShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleValueChange = (e): void => {
    const { value } = e.target;
    setsShowSearch(true);
    setName(value);
    dispatch(reset());
  };

  const handleCurrentUser = (user: User['userName']) => {
    dispatch(setSearch(user));
    setsShowSearch(false);
  };

  return (
    <div className="relative mt-2">
      <input
        type="text"
        value={name}
        className="focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        placeholder="Введите текст..."
        onChange={handleValueChange}
      />
      {showSearch && name && (
        <ul
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md"
          ref={searchRef}
        >
          {userList.map((user: User) => (
            <li
              key={user.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500"
              onClick={() => handleCurrentUser(user.userName)}
            >
              {user.userName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
