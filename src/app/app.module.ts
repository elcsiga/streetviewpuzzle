import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapModule } from './map/map.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MapModule,
    AuthModule,
    GameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
