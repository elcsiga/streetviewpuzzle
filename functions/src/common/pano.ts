export interface PanoPos {
    lat: number;
    lng: number;
}

export interface PanoPov {
    heading: number;
    pitch: number;
}

export interface PanoView {
    position: PanoPos;
    pov: PanoPov;
    zoom: number;
}

export const panoPosEquals = (pos1: PanoPos, pos2: PanoPos) =>
    pos1.lat === pos2.lat && pos1.lng === pos2.lng;
export const panoPovEquals = (pov1: PanoPov, pov2: PanoPov) =>
    pov1.heading === pov2.heading && pov1.pitch === pov2.pitch;

export const printPanoPos = (pos: PanoPos) => '[ ' + pos.lat.toFixed(4) + ' / ' + pos.lng.toFixed(4) + ' ]';