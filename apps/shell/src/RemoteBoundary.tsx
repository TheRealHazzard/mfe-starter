import { Component, Suspense, type ReactNode } from 'react';

type Props = { name: string; children: ReactNode; fallback?: ReactNode };
type State = { failed: boolean };

/**
 * Isolates a remote. If its deployment is down or throws, only this region shows
 * an error; the shell and every other remote keep working.
 */
export class RemoteBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div className="remote-error" role="alert">
            <strong>The {this.props.name} app is unavailable.</strong>
            <p>The rest of the site still works. This part is deployed separately and could not be loaded.</p>
            <button className="btn ghost" onClick={() => this.setState({ failed: false })}>
              Try again
            </button>
          </div>
        )
      );
    }
    return <Suspense fallback={<p className="muted">Loading {this.props.name}&hellip;</p>}>{this.props.children}</Suspense>;
  }
}
