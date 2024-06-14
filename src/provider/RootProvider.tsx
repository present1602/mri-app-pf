import React, {useReducer} from 'react';
import createCtx from './utils/createCtx';

interface User {
  email: string;
  username: string;
  grade: string;
  sns_type: string;
  id: number;
}

interface Context {
  state: State;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  ResetUser = 'reset-user',
  SetUser = 'set-user',
}

export interface State {
  user: User | null;
}

const initialState: State = {
  user: {'email':'', 'username': '', 'grade':'', 'sns_type':'', 'id': 0},
};

interface SetUserAction {
  type: ActionType.SetUser;
  payload: User;
}

interface ResetUserAction {
  type: ActionType.ResetUser;
}

type Action = SetUserAction | ResetUserAction ;

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const setUser = (dispatch: React.Dispatch<SetUserAction>) => (
  user: User,
): void => {
  dispatch({
    type: ActionType.SetUser,
    payload: user,
  });
};

const resetUser = (dispatch: React.Dispatch<ResetUserAction>) => (): void => {
  dispatch({
    type: ActionType.ResetUser,
  });
};

// eslint-disable-next-line default-param-last
const reducer: Reducer = (state = initialState, action) => {
  console.log("4 reducer call action : ", action)
  switch (action.type) {
    case 'reset-user':
      return initialState;
    case 'set-user':
      return {...state, user: {...state.user, ...action.payload} };
    default:
      return state;
  }
};

function AppProvider(props: Props): React.ReactElement {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const actions = {
    setUser: setUser(dispatch),
    resetUser: resetUser(dispatch),
  };

  return <Provider value={{state, ...actions}}>{props.children}</Provider>;
}

export {useCtx as useAppContext, AppProvider};