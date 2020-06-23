import * as fromStation from '../store/station.reducer';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-station-table',
  templateUrl: './station-table.component.html',
  styleUrls: ['./station-table.component.css'],
})
export class StationTableComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  displayedColumns: string[] = [
    'due',
    'id',
    'stationName',
    'platformName',
    'destination',
    'currentLocation',
    'line',
  ];
  dataSource = new MatTableDataSource();

  constructor(private store: Store<fromStation.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('station').subscribe((stateData) => {
      this.dataSource = new MatTableDataSource(stateData.stationData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
