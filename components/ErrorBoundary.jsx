import { Component } from 'react';
import Error from './Error';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Error message='An error occurred in the application.' />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
