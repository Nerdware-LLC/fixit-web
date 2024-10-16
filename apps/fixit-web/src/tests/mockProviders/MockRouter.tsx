import { useMemo } from "react";
import {
  RouterProvider,
  createMemoryRouter,
  type RouteObject,
  type MemoryRouterProps,
} from "react-router-dom";

/**
 * MockRouter provides nav/routing context using `react-router-dom`'s `createMemoryRouter`
 * and `RouterProvider`. This component can be used in two ways:
 *
 * 1. Provide an array of {@link RouteObject}s to the `routes` prop.
 *
 * 2. Wrap `MockRouter` around `children`, which will be converted into a single `route`,
 *   the `path` for which defaults to `"*"` (customize with the `route` prop).
 */
export const MockRouter = ({ routes, route = "*", children, ...opts }: MockRouterProps) => {
  // Create a `MemoryRouter` instance:
  const memoryRouter = useMemo(
    () => createMemoryRouter(routes ? routes : [{ path: route, element: children }], opts),
    [children, route, routes, opts]
  );

  return <RouterProvider router={memoryRouter} />;
};

export type MockRouterProps = MemoryRouterProps & {
  /** The `Route` component's `path` to match, defaults to `"*"` (all paths). */
  route?: string;
  routes?: RouteObject[];
};
