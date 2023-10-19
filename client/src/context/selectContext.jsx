import React, { createContext, useContext, useState } from 'react'


const SelectContext = createContext({
        select: "",
        selectUpdate: ()=>Promise,
    });

export function SelectProvider({children}){

    const [select, setSelect] = useState("By Pokemon Name/ID");
    function changeSelect(newSelect)
    {
        setSelect(newSelect);
    }
    const contextValue = {
        select: select,
        selectUpdate: changeSelect,
    }
    return (
    <SelectContext.Provider value = {contextValue}>
            {children}
    </SelectContext.Provider>
  )
}
//expose the hook
export function useSelect(){
    return useContext(SelectContext);
}