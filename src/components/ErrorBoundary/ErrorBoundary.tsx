import React from "react";
import * as Sentry from "@sentry/react";
import { logger } from "../../utils";

// NOTE: ErrorBoundary WON'T catch event-driven errors NOR async errors. So this will not work on, say, fetch state.

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
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
      `Sentry.ErrorBoundary${!!this.props?.identifier ? `:${this.props.identifier}` : null}`
    );
  }

  public render() {
    return (
      <Sentry.ErrorBoundary showDialog {...this.props}>
        {this.props.children}
      </Sentry.ErrorBoundary>
    );
  }
}

interface Props {
  identifier?: string;
  children?: React.ReactNode;
}

interface State {
  error: Error | string | null;
  hasError: boolean;
}
