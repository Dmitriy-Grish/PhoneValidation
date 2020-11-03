import { call, put } from "redux-saga/effects";
import * as ACTIONS from "../actions/Feature1";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "../types/Feature1Types";

// Replace with your sagas
export function* feature1Saga() {
  try {
  } catch (err) {}
}

export function* saga1() {
  yield takeLatest(TYPES.GET_DATA_REQUEST, feature1Saga);
}
