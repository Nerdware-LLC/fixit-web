import React from "react";
import * as Sentry from "@sentry/react";
import { logger } from "@utils";

/**
 * A reusable error-boundary with `Sentry` and logging integrations.
 *
 * **NOTE:** ErrorBoundary WON'T catch the following:
 * - Event-driven errors
 * - Uncaught promise rejections
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    error: null,
    hasError: false
  };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error(
      `${error}
      ${errorInfo}`,
      `Sentry.ErrorBoundary${this.props?.identifier ? `:${this.props.identifier}` : null}`
    );
  }

  public render() {
    const { showDialog = true, ...props } = this.props;

    return (
      <Sentry.ErrorBoundary showDialog={showDialog} {...props}>
        {this.props.children}
      </Sentry.ErrorBoundary>
    );
  }
}

export type ErrorBoundaryProps = React.ComponentProps<typeof Sentry.ErrorBoundary> & {
  identifier?: string;
  children?: React.ReactNode;
};

interface ErrorBoundaryState {
  error: Error | string | null;
  hasError: boolean;
}
