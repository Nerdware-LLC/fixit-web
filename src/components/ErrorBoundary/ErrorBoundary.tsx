import { getErrorMessage } from "@nerdware/ts-type-safety-utils";
import * as Sentry from "@sentry/react";
import { logger } from "@/utils/logger.js";
import { DefaultErrorFallback } from "./DefaultErrorFallback.jsx";

/**
 * Default `onError` handler fn for {@link ErrorBoundary}
 */
const defaultErrorBoundaryOnErrorHandler: ErrorBoundaryOnErrorHandler = (
  error: Error,
  _componentStack: string,
  _eventId: string
) => {
  logger.error(error, "Sentry.ErrorBoundary");
};

/**
 * Default `fallback` render fn for {@link ErrorBoundary}
 */
const defaultErrorBoundaryFallback: ErrorBoundaryFallbackFn = ({ error }) => (
  <DefaultErrorFallback errorMessage={getErrorMessage(error)} />
);

/**
 ;* A reusable [`Sentry ErrorBoundary`][sentry-eb-docs] component.
 *
 * > **NOTE:** ErrorBoundary components DO NOT catch the following:
 * >   - Event-driven errors
 * >   - Uncaught promise rejections
 *
 * #### [Sentry.ErrorBoundary Options][sentry-eb-opts]:
 *
 * - `showDialog` - If a [Sentry User Feedback Widget][sentry-feedback-widget] should be rendered
 *   when the ErrorBoundary catches an error.
 *
 *   - _**Default:**_ `true`
 *
 * - `dialogOptions` - Options that are passed into the Sentry User Feedback Widget. See all
 *   possible customization options [here][sentry-feedback-widget-opts].
 *
 * - `fallback` - JSX to render when the ErrorBoundary catches an error. Can be JSX or a fn that
 *   returns JSX. If you provide a fn, Sentry will call it with additional info and helpers.
 *
 *   - _**Default:**_ {@link DefaultErrorFallback|`DefaultErrorFallback`}
 *
 * - `onError` - A fn that gets called when the ErrorBoundary encounters an error. `onError` is
 *   useful if you want to propagate the error into a state management library like Redux, or if
 *   you want to check any side effects that could have occurred due to the error.
 *
 *   - _**Default:**_ {@link logger.error|`logger.error`}
 *
 * - `onMount` - A fn that gets called in `componentDidMount()`.
 *
 * - `onUnmount` - A fn that gets called in `componentWillUnmount()`.
 *
 * - `beforeCapture` - A fn that gets called before an error is sent to Sentry, allowing for extra
 *   tags or context to be added to the error.
 *
 * Click [here to view source code][sentry-eb-src] for `Sentry.ErrorBoundary`.
 *
 * @docs
 * - [React docs: Error Boundaries][react-eb-docs]
 * - [Sentry.ErrorBoundary][sentry-eb-docs]
 * - [Sentry.ErrorBoundary Options][sentry-eb-opts]
 *
 * [react-eb-docs]: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 * [sentry-eb-src]: https://github.com/getsentry/sentry-javascript/blob/develop/packages/react/src/errorboundary.tsx
 * [sentry-eb-docs]: https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/
 * [sentry-eb-opts]: https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/#options
 * [sentry-feedback-widget]: https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/user-feedback/
 * [sentry-feedback-widget-opts]: https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/user-feedback/#customizing-the-widget
 */
export class ErrorBoundary extends Sentry.ErrorBoundary {
  public static readonly defaultProps = {
    showDialog: true,
    onError: defaultErrorBoundaryOnErrorHandler,
    fallback: defaultErrorBoundaryFallback,
  } satisfies Partial<Sentry.ErrorBoundaryProps>;
}

/**
 * `onError` handler fn for {@link ErrorBoundary}
 * @note Available `onError` fn args: `error`, `componentStack`, `eventId`
 */
export type ErrorBoundaryOnErrorHandler = NonNullable<Sentry.ErrorBoundaryProps["onError"]>;

/**
 * `fallback` render fn for {@link ErrorBoundary}
 * @note Available `fallback` fn args: { `error`, `componentStack`, `eventId`, `resetError` }
 */
export type ErrorBoundaryFallbackFn = NonNullable<Sentry.ErrorBoundaryProps["fallback"]>;
