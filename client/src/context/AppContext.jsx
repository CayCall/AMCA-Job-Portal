import { createContext } from 'react';

const AppContext = createContext();
export default AppContext;
// App context so I can share data globally across my app without passing props manually at every level
// AppContext is my global store
// It will hold my share values in the app 