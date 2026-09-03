import { Component } from "react";

// Without this, an uncaught error ANYWHERE in the render/commit phase
// unmounts the entire app to a blank page — including the intermittent
// dev-only StrictMode + GSAP SplitText "removeChild" crash in Typewriter
// (SplitText physically rewrites the DOM inside its own span, which React
// has no knowledge of; StrictMode's mount→cleanup→remount cycle occasionally
// races that against React's own reconciliation). That race is a
// development-mode-only artifact — StrictMode's double-invoke doesn't exist
// in production builds — but it's still disruptive locally, so this catches
// it (and anything else) and recovers on the next navigation instead of
// leaving the whole site blank.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught a render error, recovering:", error, info);
  }

  // Route changes are the natural "try again" moment — if the crash was a
  // one-off (like the StrictMode race above), the next render succeeds and
  // the fallback goes away on its own instead of needing a manual reload.
  componentDidUpdate() {
    if (this.state.hasError && this.props.resetKey !== this._lastResetKey) {
      this._lastResetKey = this.props.resetKey;
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      this._lastResetKey = this.props.resetKey;
      return null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
