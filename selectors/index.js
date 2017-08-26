import { createSelector } from 'reselect';

export const selectState = () => (state) => state;

export const selectError = () => createSelector(
  selectState(),
  (subState) => subState.error
);

export const selectEmail = () => createSelector(
  selectState(),
  (subState) => subState.email
);

export const selectPassword = () => createSelector(
  selectState(),
  (subState) => subState.password
);

export const selectLoginData = () => createSelector(
  selectState(),
  (subState) => subState.loginData
);

export const selectListArticle = () => createSelector(
  selectState(),
  (subState) => subState.articles
);

export const selectArticle = () => createSelector(
  selectState(),
  (subState) => subState.article
);