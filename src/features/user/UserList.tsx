import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import UserCard from './UserCard';

export default function UserList(): JSX.Element {
  const userList = useSelector((store: RootState) => store.user.users);
  const isLoading = useSelector((store: RootState) => store.user.isLoading);
  return (
    <div className="flex flex-wrap justify-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : userList.length === 0 ? (
        <p> Таких котиков неть....</p>
      ) : (
        userList.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </div>
  );
}
