import { GlobalContext } from 'context';
import { useContext } from 'react';

export const useGlobal = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error(
      'useGlobal has to be used within <GlobalProvider>',
    );
  }

  return globalContext;
};
