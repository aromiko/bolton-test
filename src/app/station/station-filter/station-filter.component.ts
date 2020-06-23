import * as StationActions from '../store/station.actions';

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import stationData from '../../../assets/stationData.json';

@Component({
  selector: 'app-station-filter',
  templateUrl: './station-filter.component.html',
  styleUrls: ['./station-filter.component.css'],
})
export class StationFilterComponent implements OnInit {
  station: Observable<{ selectedStation: string; selectedStationId: string }>;
  stations = stationData;
  stationLine = stationData[0].stationLine;
  constructor(
    private store: Store<{
      station: { selectedStation: string; selectedStationId: string };
    }>
  ) {}

  ngOnInit(): void {
    this.station = this.store.select('station');
  }

  onChangeStation(event) {
    this.store.dispatch(new StationActions.SelectStation(event.value));
    this.store.dispatch(
      new StationActions.SelectStationId(
        this.stations[
          this.stations.map((e) => e.stationName).indexOf(event.value)
        ].stationId
      )
    );
  }
}
