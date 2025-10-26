import React, { useState } from 'react';
import type { ReactNode } from 'react';
import StoreContext from './Context';

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <StoreContext.Provider value={{ token, setToken }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;