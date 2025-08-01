import { useState } from 'react';
import AppContext from './AppContext';

const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title:'',
    location:'',
  })
  const[isSearched,setIsSearched] = useState(false)
  const value ={
    setSearchFilter,searchFilter, 
    isSearched, setIsSearched
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

//allow me to make the context value avaible anywhere in my application 
// value = {} is the data shared across components 
//Using the context provider (<AppContext.Provider>).
//Passing in the value to share globally (value={value}).
//Wrapping all children of this provider ({props.children}) so they can access the context.