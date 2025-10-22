import { createContext } from 'react';

interface StoreContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const StoreContext = createContext < StoreContextType > ({
    token: null,
    setToken: () => { },
});

export default StoreContext;