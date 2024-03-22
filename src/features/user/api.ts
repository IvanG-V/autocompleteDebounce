import type { State, User } from './userSlice/types';

export const loadUsersFromServer = async (
  obj: Pick<State, 'searchTerm' | 'page'>,
): Promise<User[]> => {
  try {
    return (
      await fetch(`/api/users?userName_like=${obj.searchTerm}&_limit=15&_page=${obj.page}`)
    ).json();
  } catch (error) {
    throw error;
  }
};
