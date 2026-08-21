import type { RouteDefinition } from './route-definition';

export function defineRoute<T extends RouteDefinition>(route: T): T {
    return route;
}