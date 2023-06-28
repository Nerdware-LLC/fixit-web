import React from "react";
import * as Sentry from "@sentry/react";
import { logger } from "@utils/logger";

/**
 * A reusable error-boundary with `Sentry` and logging integrations.
 *
 * **NOTE:** ErrorBoundary WON'T catch the following:
 * - Event-driven errors
 * - Uncaught promise rejections
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    error: null,
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error) {
    logger.error(error, "ErrorBoundary.getDerivedStateFromError");
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error(
      `${error}
      ${errorInfo}`,
      `ErrorBoundary${this.props?.identifier ? `:${this.props.identifier}` : null}`
    );
  }

  public override render() {
    const { showDialog = true, ...props } = this.props;

    return (
      <Sentry.ErrorBoundary showDialog={showDialog} {...props}>
        {this.props.children}
      </Sentry.ErrorBoundary>
    );
  }
}

export type ErrorBoundaryProps = React.ComponentProps<typeof Sentry.ErrorBoundary> & {
  showDialog?: boolean;
  identifier?: string;
  children?: React.ReactNode;
};

interface ErrorBoundaryState {
  error: Error | string | null;
  hasError: boolean;
}
