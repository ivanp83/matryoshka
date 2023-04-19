import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Container from "../../components/container/Container";
import "./ErrorPage.scss";
function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <section className="error-page">
        <Container>
          <h1>{error.status}</h1>
          <h2>{error.data.message || "Что-то пошло не так!"}</h2>
        </Container>
      </section>
    );
  }

  throw error;
}

export default ErrorPage;
