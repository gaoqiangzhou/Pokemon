import React from 'react'
import { useState } from 'react';
import {AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai';
import { useSelect } from '../context/selectContext';

const DropdownList = () => {
    const [isOpen, setIsopen] = useState(false);
    const {select, selectUpdate} = useSelect();
  return (
    <div className="relative flex flex-col items-center w-28 h-[16rem] rounded-lg">
      <button onClick={() => setIsopen((prev) => !prev)}
              className="bg-blue-400 p-0 w-full h-1/3 flex items-center justify-between font-bold text-xs rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">
        {select}
        {!isOpen ? (
            <AiOutlineCaretDown className="h-8"/>
        ) : (
            <AiOutlineCaretUp className="h-8"/>
        )}
      </button>

      {isOpen && 
        <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full h-2/3 z-10">
                <button onClick={() => {
                    selectUpdate("By Pokemon Name/ID");
                    setIsopen(false)}} 
                    className="font-bold flex w-full justify-center text-xs hover:bg-blue-300 cursor-pointer rounded-lg border-l-transparent hover:border-white border-l-4 p-4">
                        By Pokemon Name/ID
                </button>
                <button onClick={() => {
                    selectUpdate("By Type");
                    setIsopen(false)}} 
                    className="font-bold flex w-full justify-center text-xs hover:bg-blue-300 cursor-pointer rounded-lg border-l-transparent hover:border-white border-l-4 p-4">
                        By Type
                </button>

        </div> 
      }
    </div>
  )
}

export default DropdownList
