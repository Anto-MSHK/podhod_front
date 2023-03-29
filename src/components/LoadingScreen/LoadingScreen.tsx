import React from "react";
import { Spinner } from "reactstrap";

export const LoadingScreen = () => {
  return (
    <div style={{ margin: 10 }}>
      {[...Array(100)].map((_,index) => (
        <Spinner key={index}
          type="grow"
          style={{ width: 100, height: 100, color: "#1a1a1a", marginTop: -5 }}
        />
      ))}
    </div>
  );
};
