import * as StationActions from './store/station.actions';
import * as fromStation from './store/station.reducer';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import stationData from '../../assets/stationData.json';

declare var Ably: any;
@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css'],
})
export class StationComponent implements OnInit, OnDestroy {
  channelSubscription: Subscription;
  stationSubscription: Subscription;
  selectedStation: string;
  selectedStationId: string;
  selectedStationLine: string;
  stations = stationData;

  ably: any;
  channelName: string;
  channel: any;

  constructor(private store: Store<fromStation.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(
      new StationActions.SelectStation(this.stations[0].stationName)
    );
    this.store.dispatch(
      new StationActions.SelectStationId(this.stations[0].stationId)
    );
    this.store.dispatch(
      new StationActions.SelectStationLine(this.stations[0].stationLine[0])
    );
    this.stationSubscription = this.store
      .select('station')
      .subscribe((stateData) => {
        this.selectedStation = stateData.selectedStation;
        this.selectedStationId = stateData.selectedStationId;
        this.selectedStationLine = stateData.selectedStationLine;
      });

    this.subscribeToChannel(
      this.selectedStationLine,
      this.selectedStationId,
      this.channel
    );
  }

  subscribeToChannel(stationLine, stationId, channel) {
    if (channel) {
      channel.detach((err) => {
        if (err) {
          console.log('Error detaching: ' + err);
        } else {
          this.stationSubscribe(stationLine, stationId);
        }
      });
    } else {
      this.stationSubscribe(stationLine, stationId);
    }
  }

  stationSubscribe(stationLine, stationId) {
    this.ably = new Ably.Realtime('ZoVHGw.4kc1eQ:xNiIHH2-oeOYIOwG');
    this.channelName =
      '[product:ably-tfl/tube]tube:' +
      stationLine +
      ':' +
      stationId +
      ':arrivals';
    this.channel = this.ably.channels.get(this.channelName);

    this.stationHistory();
    this.channelSubscription = this.channel.subscribe((liveData) => {
      console.log('New Data from live: ' + liveData.data);
      this.store.dispatch(new StationActions.SetStationData(liveData.data));
    });
  }

  stationHistory() {
    this.channel.attach((err) => {
      this.channel.history(
        { untilAttach: true, limit: 1 },
        (err, resultData) => {
          if (err) {
            console.log(err);
            return;
          }
          let recentData = resultData.items[0];
          this.store.dispatch(
            new StationActions.SetStationData(recentData.data)
          );
        }
      );
    });
  }

  onStationChange(event) {
    this.subscribeToChannel(
      this.selectedStationLine,
      this.selectedStationId,
      this.channel
    );
  }

  onStationLineChange(event) {
    this.subscribeToChannel(
      this.selectedStationLine,
      this.selectedStationId,
      this.channel
    );
  }

  ngOnDestroy() {
    this.stationSubscription.unsubscribe();
    this.channelSubscription.unsubscribe();
  }
}
