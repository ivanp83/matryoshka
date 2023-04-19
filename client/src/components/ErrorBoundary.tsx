import { Component, ErrorInfo, ReactNode } from "react";
import Container from "./container/Container";
import "./ErrorBoundary.scss";
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <Container>
            <p>Призошла ошибка. Попробуйте презагрузить приложение.</p>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
