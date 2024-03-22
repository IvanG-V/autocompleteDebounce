import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../store';
import { lastPage, nextPage } from '../user/userSlice/userSlice';

export default function PaginateBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const page = useSelector((store: RootState) => store.user.page);
  const userList = useSelector((store: RootState) => store.user.users);

  const handlePageChangeNext = (): void => {
    dispatch(nextPage());
  };
  const handlePageChangeLast = (): void => {
    dispatch(lastPage());
  };
  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={page === 1}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        onClick={handlePageChangeLast}
      >
        Предыдущая
      </button>
      <span className="bg-gray-300 py-2 px-4">Страница: {page} </span>
      <button
        disabled={userList.length === 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        onClick={handlePageChangeNext}
      >
        Следующая
      </button>
    </div>
  );
}
