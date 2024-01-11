import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oops, something went wrong!</h1>
      <p>We're working hard to fix the issue. Please try again later.</p>
      <a href="/login">Go back to home page</a>
    </div>
  );
};

export default ErrorPage;
