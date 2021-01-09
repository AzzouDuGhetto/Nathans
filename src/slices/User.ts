import { createSlice, createSelector } from '@reduxjs/toolkit';
import { purgeStoredState } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export type UserType = {
  user: {
    id: string | null;
    name: string | null;
    phone: string | null;
    picture: string | null;
    email: string | null;
    token: string | null;
  };
};

export const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: {
      id: null,
      name: null,
      phone: null,
      picture: null,
      email: null,
      token: null,
    },
  } as UserType,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setName: (state, action) => {
      state.user.name = action.payload.name;
    },
    setPhone: (state, action) => {
      state.user.phone = action.payload.phone;
    },
    setPicture: (state, action) => {
      state.user.picture = action.payload.picture;
    },
    setEmail: (state, action) => {
      state.user.email = action.payload.email;
    },
    flush: (state) => {
      state.user = {
        id: null,
        name: null,
        phone: null,
        picture: null,
        email: null,
        token: null,
      };
      purgeStoredState(persistConfig);
    },
  },
});

const stateSelector = createSelector(
  ({ user }: { user: UserType }) => user,
  (state) => state
);

export const userSelectors = {
  isLogged: createSelector(stateSelector, (state) => {
    return !!state.user.token;
  }),
  getId: createSelector(stateSelector, (state) => {
    return state.user.id ?? undefined;
  }),
  getName: createSelector(stateSelector, (state) => {
    return state.user.name ?? undefined;
  }),
  getPhone: createSelector(stateSelector, (state) => {
    return state.user.phone ?? undefined;
  }),
  getPicture: createSelector(stateSelector, (state) => {
    return state.user.picture ?? undefined;
  }),
  getEmail: createSelector(stateSelector, (state) => {
    return state.user.email ?? undefined;
  }),
  getToken: createSelector(stateSelector, (state) => {
    return state.user.token ?? undefined;
  }),
};

export const { actions: userActions, reducer: userReducer } = userSlice;
