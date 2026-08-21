import type { RouteDefinition } from './route-definition';

const routeRegistry: RouteDefinition[] = [];

export function registerRoute(route: RouteDefinition): void {
    routeRegistry.push(route);
}

export function getRoutes(): readonly RouteDefinition[] {
    return routeRegistry;
}