export type User = {
  id: number;
  userName: string;
  avatarUrl: string;
};

export type State = {
  users: User[];
  isLoading: boolean;
  error: string | null;
  page: number;
  searchTerm: string;
};


