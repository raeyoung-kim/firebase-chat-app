import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './slice/user';

const rootReducer = combineReducers({
  userReducer: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // preloadedState (서버 사이드 렌더링 전용)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
