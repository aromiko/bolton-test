import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { StationComponent } from './station/station.component';
import { StationFilterComponent } from './station/station-filter/station-filter.component';
import { StationTableComponent } from './station/station-table/station-table.component';
import { StoreModule } from '@ngrx/store';
import { stationReducer } from './station/store/station.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StationComponent,
    StationFilterComponent,
    StationTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    StoreModule.forRoot({ station: stationReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
