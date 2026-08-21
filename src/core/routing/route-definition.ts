import type { RequestHandler } from 'express';

export type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';

export type RouteAuth = 'public' | 'required';

export type RoutePermission = 'none' | 'required';

export interface RouteDefinition {
    uniqueCode: string;

    method: HttpMethod;

    path: string;

    resource: string;

    description: string;

    auth: RouteAuth;

    permission: RoutePermission;

    handler: RequestHandler;
}