import * as StationActions from '../store/station.actions';
import * as fromStation from '../store/station.reducer';

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import stationData from '../../../assets/stationData.json';

@Component({
  selector: 'app-station-filter',
  templateUrl: './station-filter.component.html',
  styleUrls: ['./station-filter.component.css'],
})
export class StationFilterComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  station: Observable<fromStation.State>;
  stations = stationData;
  selectedStation: string;
  selectedStationLine: string;
  stationLineList = [];

  @Output() stationChanged = new EventEmitter();
  @Output() stationLineChanged = new EventEmitter();

  constructor(private store: Store<fromStation.AppState>) {}

  ngOnInit(): void {
    this.station = this.store.select('station');
    this.subscription = this.store.select('station').subscribe((stateData) => {
      this.selectedStation = stateData.selectedStation;
      this.selectedStationLine = stateData.selectedStationLine;
    });
    this.stationLineList = this.stations[
      this.stations.map((e) => e.stationName).indexOf(this.selectedStation)
    ].stationLine;
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
    this.store.dispatch(
      new StationActions.SelectStationLine(
        this.stations[
          this.stations.map((e) => e.stationName).indexOf(event.value)
        ].stationLine[0]
      )
    );
    this.stationLineList = this.stations[
      this.stations.map((e) => e.stationName).indexOf(this.selectedStation)
    ].stationLine;
    this.stationChanged.emit();
  }

  onChangeStationLine(event) {
    this.store.dispatch(new StationActions.SelectStationLine(event.value));
    this.stationLineChanged.emit({});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
