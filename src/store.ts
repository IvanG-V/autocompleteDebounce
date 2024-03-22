import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSlice from './features/user/userSlice/userSlice';

//  создаем redux стор
const store = configureStore({
  reducer: {
    user: userSlice
  },
});

//  протипизировать глобальный стор для useSelector
export type RootState = ReturnType<typeof store.getState>;

// протипизировали диспатч, чтобы он нам подсказывал типы
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
