import * as ActionTypes from './station.types';
import * as StationActions from './station.actions';

export interface State {
  selectedStation: string;
  selectedStationId: string;
  selectedStationLine: string;
  stationData: object[];
}

export interface AppState {
  station: State;
}

const initialState: State = {
  selectedStation: '',
  selectedStationId: '',
  selectedStationLine: '',
  stationData: [],
};

export function stationReducer(
  state: State = initialState,
  action: StationActions.StationAllActions
) {
  switch (action.type) {
    case ActionTypes.SELECT_STATION:
      return { ...state, selectedStation: action.payload };
    case ActionTypes.SELECT_STATION_ID:
      return { ...state, selectedStationId: action.payload };
    case ActionTypes.SET_STATION_DATA:
      return { ...state, stationData: action.payload };
    case ActionTypes.SELECT_STATION_LINE:
      return { ...state, selectedStationLine: action.payload };
    default:
      return state;
  }
}
