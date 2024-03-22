import React from 'react';
import { type User } from './userSlice/types';

export default function UserCard({ user }: { user: User }): JSX.Element {
  const handleImageError = (event) => {
    event.target.src =
      'https://avatars.dzeninfra.ru/get-zen_doc/34175/pub_5cea2361585c2f00b5c9cb0b_5cea310a752e5b00b25b9c01/scale_1200';
  };
  return (
    <div className="flex flex-col items-center m-2" >
      <img
        className="w-40 h-40 rounded-full object-cover mb-2"
        src={user.avatarUrl}
        onError={handleImageError}
        alt={user.userName}
      />
      <h2 className="text-lg font-semibold">{user.userName}</h2>
    </div>
  );
}
