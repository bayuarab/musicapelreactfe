import { createContext, useContext, useState } from "react";

const ComponentStateContext = createContext({});

export function useComponentBarState() {
  return useContext(ComponentStateContext);
}

export const ComponentStateProvider = ({ children }) => {
  const [componentState, setComponentState] = useState({
    footerState: true,
    paymentPageState: false,
  });

  return (
    <ComponentStateContext.Provider
      value={{ componentState, setComponentState }}
    >
      {children}
    </ComponentStateContext.Provider>
  );
};

export default ComponentStateContext;
