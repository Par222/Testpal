import React from "react";
import { useState } from "react";
export const AuthContext = React.createContext({
  login:{},
  credentialHandler:()=>{},
  savedTest:[],
  saveHandler:()=>{}
});

const AuthProvider = (props) => {
  const [login, setLogin]=useState({});
  const [savedTest,setSaveTest]=useState([])
  const saveHandler=(test)=>{
        setSaveTest([...savedTest,test])
  }
  const credentialHandler=(cred)=>{
   setLogin(cred)
   console.log(cred)
   localStorage.setItem('type','student')


  }
  const val = {
    login:login,
    saveHandler,
    savedTest,
    credentialHandler:credentialHandler
  };
  return (
    <AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
  );
};
export default AuthProvider
