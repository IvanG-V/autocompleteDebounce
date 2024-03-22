import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserList from '../features/user/UserList';
import { RootState, useAppDispatch } from '../store';
import { loadUsers } from '../features/user/userSlice/userSlice';
import PaginateBar from '../features/paginate/PaginateBar';
import SearchBar from '../features/searchBar/ SearchBar';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const page = useSelector((store: RootState) => store.user.page);
  const searchTerm = useSelector((store: RootState) => store.user.searchTerm);

  useEffect(() => {
    dispatch(loadUsers({page, searchTerm}));
  }, [page, searchTerm]);

  return (
    <>
      <SearchBar />
      <UserList />
      <PaginateBar />
    </>
  );
}
