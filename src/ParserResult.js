import React from "react";

const Parser = ({ result }) => {
  return (
    <div className="pt-4">
      <pre>{JSON.stringify(result, 0, 4)}</pre>
    </div>
  );
};

export default Parser;
