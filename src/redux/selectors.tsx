interface ReduxState {
  screenWidth: number;
  screenHeight: number;
}

interface RootState {
  redux: ReduxState;
}

export const setScreenWidth = (state: RootState) => state.redux.screenWidth;

export const setScreenHeight = (state: RootState) => state.redux.screenHeight;
