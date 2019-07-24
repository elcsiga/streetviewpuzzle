import { Injectable } from '@angular/core';
import loadGoogleMapsApi from 'load-google-maps-api';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, filter, take, distinctUntilChanged } from 'rxjs/operators';
import { PanoView, PanoPos, PanoPov, panoPovEquals, panoPosEquals } from 'functions/src/common/pano';
import { mapsConfig } from 'functions/src/common/app-config-private';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private panorama;
  private positionSource;
  private povSource;

  public baseView: PanoView = {
    position: {
      lat: 47.49801,
      lng: 19.03991
    },
    pov: {
      heading: 100,
      pitch: 0
    },
    zoom: 1
  };

  private googleMaps = new BehaviorSubject(null);
  googleMaps$ = this.googleMaps.pipe(
    filter(m => !!m)
  );

  private currentPos = new BehaviorSubject<PanoPos>(this.baseView.position);
  private currentPov = new BehaviorSubject<PanoPov>(this.baseView.pov);

  getCurrentView$(viewSource: string): Observable<PanoView> {
    return combineLatest([
      this.getCurrentPos$(viewSource),
      this.getCurrentPov$(viewSource)
    ]).pipe(
      map(([position, pov]) => ({ position, pov, zoom: 1 }))
    );
  }

  constructor() { }

  getCurrentPos$(positionSource: string) {
    return this.currentPos.pipe(
      distinctUntilChanged(panoPosEquals),
      filter(pos => positionSource !== this.positionSource)
    );
  }

  getCurrentPov$(povSource: string) {
    return this.currentPov.pipe(
      distinctUntilChanged(panoPovEquals),
      filter(pov => povSource !== this.povSource)
    );
  }

  init() {
    loadGoogleMapsApi({
      key: mapsConfig.apiKey
    }).then(googleMaps => {
      console.log('Maps API loaded...');
      this.googleMaps.next(googleMaps);
    }).catch(error => {
      console.error('Maps API loading failed!', error);
    });
  }

  setPos(pos: any, positionSource: string) {
    this.positionSource = positionSource;
    this.currentPos.next({ lat: pos.lat(), lng: pos.lng() });
  }

  setPov(pov: any, povSource: string) {
    this.povSource = povSource;
    this.currentPov.next({ heading: pov.heading, pitch: pov.pitch });
  }

  setView(view: PanoView, viewSource: string) {
    this.povSource = viewSource;
    this.positionSource = viewSource;
    this.currentPos.next(view.position);
    this.currentPov.next(view.pov);
  }

  getCurrentViewSnapshot(): PanoView {
    let view: PanoView;
    this.currentView$.pipe(take(1)).subscribe(w => view = w);
    return view;
  }
}
