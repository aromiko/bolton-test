import * as StationActions from './station.actions';

const initialState = {
  selectedStation: 'Euston Underground Station',
  selectedStationId: '940GZZLUEUS',
  stationData: [],
};

export function stationReducer(
  state = initialState,
  action: StationActions.StationAllActions
) {
  switch (action.type) {
    case StationActions.SELECT_STATION:
      return { ...state, selectedStation: action.payload };
    case StationActions.SELECT_STATION_ID:
      return { ...state, selectedStationId: action.payload };
    case StationActions.SET_STATION_DATA:
      return { ...state, stationData: action.payload };
    default:
      return state;
  }
}
