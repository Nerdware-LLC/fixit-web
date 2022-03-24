import React from "react";
import * as Sentry from "@sentry/react";
import { any, string } from "../../types";
import { logger } from "../../utils";

// NOTE: ErrorBoundary WON'T catch event-driven errors NOR async errors. So this will not work on, say, fetch state.

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logger.error(
      error,
      `ErrorBoundary${
        this.props.identifier ? `:${this.props.identifier}` : null
      }`
    );
  }

  render() {
    return (
      <Sentry.ErrorBoundary showDialog {...this.props}>
        {this.props.children}
      </Sentry.ErrorBoundary>
    );
  }
}

ErrorBoundary.propTypes = {
  identifier: string,
  children: any.isRequired
};
