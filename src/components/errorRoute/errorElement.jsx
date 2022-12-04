import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError();
  return (
    <>
      <h2>There has been an error displaying this page.</h2>
      <h3>
        {error.status} - {error.statusText}
      </h3>
    </>
  );
}
