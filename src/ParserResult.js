import { useEffect } from "react";

import { saveZip, saveFile } from "./utils";

const Parser = ({ result }) => {
  useEffect(() => {
    if (result.length === 0) {
      return;
    }

    if (result.length === 1) {
      saveFile(result[0]);
    } else {
      saveZip(result);
    }
  }, [result]);

  return null;
};

export default Parser;
