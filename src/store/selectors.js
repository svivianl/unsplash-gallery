import { createSelector } from "reselect";

export const getState = (state) => state.upslashState;

export const getIsLoading = createSelector(
  getState,
  (state) => state?.isLoading || false
);

export const getPhotoDetails = createSelector(
  getState,
  (state) => state?.photoDetails || {}
);