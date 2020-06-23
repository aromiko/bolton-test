import * as StationActions from '../store/station.actions';
import * as fromStation from '../store/station.reducer';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-station-table',
  templateUrl: './station-table.component.html',
  styleUrls: ['./station-table.component.css'],
})
export class StationTableComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private store: Store<fromStation.AppState>) {}

  tableData = [];

  ngOnInit(): void {
    this.subscription = this.store.select('station').subscribe((stateData) => {
      if (stateData.stationData) {
        this.tableData = stateData.stationData;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
