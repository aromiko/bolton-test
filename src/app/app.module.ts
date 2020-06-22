import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { StationComponent } from './station/station.component';
import { StationFilterComponent } from './station/station-filter/station-filter.component';
import { StationTableComponent } from './station/station-table/station-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StationComponent,
    StationFilterComponent,
    StationTableComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MatToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
