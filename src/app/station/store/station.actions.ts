import * as ActionTypes from './station.types';

import { Action } from '@ngrx/store';

export class SelectStation implements Action {
  readonly type = ActionTypes.SELECT_STATION;
  constructor(public payload: string) {}
}

export class SelectStationId implements Action {
  readonly type = ActionTypes.SELECT_STATION_ID;
  constructor(public payload: string) {}
}

export class SelectStationLine implements Action {
  readonly type = ActionTypes.SELECT_STATION_LINE;
  constructor(public payload: string) {}
}

export class SetStationData implements Action {
  readonly type = ActionTypes.SET_STATION_DATA;
  constructor(public payload: Object[]) {}
}

export type StationAllActions =
  | SelectStation
  | SelectStationId
  | SelectStationLine
  | SetStationData;
