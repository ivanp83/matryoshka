"use client";

import Button from "./components/buttons/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            placeContent: "center",
            textAlign: "center",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Helvetica Neue, Inter, Roboto, Arial, Ubuntu, sans-serif",
          }}
        >
          <h2>Что-то пошло не так!</h2>
          <Button
            actionType="shop"
            title="Попробуй снова"
            onClick={() => reset()}
          />
        </div>
      </body>
    </html>
  );
}
