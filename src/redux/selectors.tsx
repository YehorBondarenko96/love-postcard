interface ReduxState {
  screenWidth: number;
}

interface RootState {
  redux: ReduxState;
}

export const setScreenWidth = (state: RootState) => state.redux.screenWidth;