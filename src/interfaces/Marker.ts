import { type LatLngExpression } from 'leaflet';

export interface IMarker {
    name: string;
    coordinates: LatLngExpression;
    _id: string;
};