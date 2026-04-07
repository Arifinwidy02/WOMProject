import { FetchUserType } from './fetchUser';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Detail: { user: FetchUserType };
};
