import { type LatLngExpression } from 'leaflet';

export interface ICrag {
    coordinates: LatLngExpression,
    images: Array<string>,
    routesAmount: number;
    description: string,
    country: string,
    name: string,
    _id: string;
};