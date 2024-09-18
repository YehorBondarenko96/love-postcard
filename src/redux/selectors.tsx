interface ReduxState {
  screenWidth: number;
  screenHeight: number;
  answer: string | null;
}

interface RootState {
  redux: ReduxState;
}

export const getScreenWidth = (state: RootState) => state.redux.screenWidth;

export const getScreenHeight = (state: RootState) => state.redux.screenHeight;

export const getAnswer = (state: RootState) => state.redux.answer;

