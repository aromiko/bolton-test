import { Action } from '@ngrx/store';

export const SELECT_STATION = 'SELECT_STATION';
export const SELECT_STATION_ID = 'SELECT_STATION_ID';
export const SET_STATION_DATA = 'SET_STATION_DATA';

export class SelectStation implements Action {
  readonly type = SELECT_STATION;
  constructor(public payload: string) {}
}

export class SelectStationId implements Action {
  readonly type = SELECT_STATION_ID;
  constructor(public payload: string) {}
}

export class SetStationData implements Action {
  readonly type = SET_STATION_DATA;
  constructor(public payload: Object[]) {}
}

export type StationAllActions =
  | SelectStation
  | SelectStationId
  | SetStationData;
