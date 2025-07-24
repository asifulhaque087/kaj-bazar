// External Imports
import { useState, useEffect } from "react";

// useIsBrowser
export const useBrowser = () => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    // this hook only runs inside of the browser
    setIsBrowser(true);
  }, []);

  return isBrowser;
};
