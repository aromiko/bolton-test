import { Component, OnInit } from '@angular/core';

declare var Ably: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'bolton-test';
  data = [];

  ably = new Ably.Realtime('ZoVHGw.4kc1eQ:xNiIHH2-oeOYIOwG');
  channelName = '[product:ably-tfl/tube]tube:northern:940GZZLUEUS:arrivals';
  channel = this.ably.channels.get(this.channelName);

  ngOnInit(): void {
    this.channel.subscribe((msg) => {
      /* station update in msg */
      this.data = msg.data;
      console.log(msg.data);
    });
  }
}
