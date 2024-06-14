import React, {useReducer} from 'react';
import createCtx from './utils/createCtx';

interface QuestionData {
  aid:string,
  isQuestionSet: boolean,
  bs_question_count: number,
  page: number,
  page_list: any,
  data: {
    article: any,
    sentence_list: any,
    formula: any,
    bs_question: any,
    bs_solution: any,
    ap_question:any,
    bl_sentence_list: any,
    initial_bl_sentence_list: any
  }
}

interface Context {
  questionState: State;
  setQuestionData: (questionData: QuestionData) => void;
  resetQuestionData: () => void;
  setQuestionDataComplete: () => void;
}

const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  SetQuestionData = 'set-question-data',
  SetQuestionDataComplete = 'set-question-data-complete',
  ResetQuestionData = 'reset-question-data',
  
}

export interface State {
  loading: boolean,
  questionData: QuestionData;
}

// aid: aid,
// isQuestionSet: true,
// bs_question_count: data.article.question_count,
// data: {
//   article: article,
//   formula: formula,
//   bs_question: bs_question,
//   sentence_list: sentence_list,
//   bs_solution: bs_solution,
//   ap_question: ap_question,
// }


const initialState: State = {
  loading: false,
  questionData : {
    aid: '',
    isQuestionSet: false,
    bs_question_count : 0,
    page_list: [],
    page: 1,
    data: {
      article: {},
      formula: {},
      sentence_list: [],
      bs_question: [],
      bs_solution: [],
      ap_question: [],
      bl_sentence_list: [],
      initial_bl_sentence_list: []
    }
  }
};

interface SetQuestionAction {
  type: ActionType.SetQuestionData;
  payload: QuestionData;
}

interface ResetQuestionAction {
  type: ActionType.ResetQuestionData;
}

interface SetQuestionDataCompleteAction {
  type: ActionType.SetQuestionDataComplete;
}



type Action = SetQuestionAction | ResetQuestionAction | SetQuestionDataCompleteAction;

interface Props {
  children?: React.ReactElement;
}

type Reducer = (questionState: State, action: Action) => State;

const setQuestionData = (dispatch: React.Dispatch<SetQuestionAction>) => (
  questionData: QuestionData,
): void => {
  dispatch({
    type: ActionType.SetQuestionData,
    payload: questionData,
  });
};

const resetQuestionData = (dispatch: React.Dispatch<ResetQuestionAction>) => (): void => {
  dispatch({
    type: ActionType.ResetQuestionData,
  });
};

const setQuestionDataComplete = (dispatch: React.Dispatch<SetQuestionDataCompleteAction>) => (): void => {
  dispatch({
    type: ActionType.SetQuestionDataComplete,
  });
  
};

// eslint-disable-next-line default-param-last
const reducer: Reducer = (questionState = initialState, action) => {
  console.log("4 reducer call action : ", action)
  switch (action.type) {
    case 'reset-question-data':
      return initialState;
    case 'set-question-data-complete':
      return {
        ...questionState, loading: false                                                                                                    
      }
    case 'set-question-data':
      return {questionData: action.payload, loading: true};
      // return {...questionState, questionData: action.payload, loading: true};
    default:
      return questionState;
  }
};

function QuestionProvider(props: Props): React.ReactElement {
  const [questionState, dispatch] = useReducer<Reducer>(reducer, initialState);

  const actions = {
    setQuestionData: setQuestionData(dispatch),
    resetQuestionData: resetQuestionData(dispatch),
    setQuestionDataComplete: setQuestionDataComplete(dispatch)
  };

  return <Provider value={{questionState, ...actions}}>{props.children}</Provider>;
}

export {useCtx as useQuestionContext, QuestionProvider};