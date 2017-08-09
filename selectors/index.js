import { createSelector } from 'reselect';

export const selectState = () => (state) => state;

export const selectError = () => createSelector(
  selectState(),
  (subState) => subState.error
);
