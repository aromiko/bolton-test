import * as StationActions from './store/station.actions';

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

declare var Ably: any;
@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css'],
})
export class StationComponent implements OnInit {
  data = [];
  station: Observable<{
    selectedStation: string;
    selectedStationId: string;
    stationData: object[];
  }>;

  ably: any;
  channelName: string;
  channel: any;

  constructor(
    private store: Store<{
      station: {
        selectedStation: string;
        selectedStationId: string;
        stationData: object[];
      };
    }>
  ) {}

  ngOnInit(): void {
    this.station = this.store.select('station');

    this.stationSubscribe('metropolitan', '940GZZLUBST');
  }

  // subscribeToChannel(stationLine, stationId, channel, stationSubscribe) {
  //   if (channel) {
  //     channel.detach((err) => {
  //       if (err) {
  //         console.log('Error detaching: ' + err);
  //       } else {
  //         stationSubscribe(stationLine, stationId);
  //       }
  //     });
  //   } else {
  //     stationSubscribe(stationLine, stationId);
  //   }
  // }

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
    this.channel.subscribe((liveData) => {
      console.log(liveData);
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
}
