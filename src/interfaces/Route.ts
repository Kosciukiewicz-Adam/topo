import { RouteType } from "../consts/RouteType";

export interface IRoute {
    established: string;
    sectorId: string;
    type: RouteType;
    length: string;
    author: string;
    cragId: string;
    grade: string;
    name: string;
    _id: string;
};