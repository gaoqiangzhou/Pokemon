import React from 'react'
import { useState } from 'react';
import {AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai';
import { useSelect } from '../context/selectContext';

const DropdownList = () => {
    const [isOpen, setIsopen] = useState(false);
    const {select, selectUpdate} = useSelect();
  return (
    <div className="relative flex flex-col items-center w-[340px] h-[340px] rounded-lg">
      <button onClick={() => setIsopen((prev) => !prev)}
              className="bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white">
        {select}
        {!isOpen ? (
            <AiOutlineCaretDown className="h-8"/>
        ) : (
            <AiOutlineCaretUp className="h-8"/>
        )}
      </button>

      {isOpen && 
        <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full">
                <button onClick={() => {
                    selectUpdate("By Pokemon Name/ID");
                    setIsopen(false)}} 
                    className="font-bold flex w-full justify-center hover:bg-blue-300 cursor-pointer rounded-lg border-l-transparent hover:border-white border-l-4 p-4">
                        By Pokemon Name/ID
                </button>
                <button onClick={() => {
                    selectUpdate("By Type");
                    setIsopen(false)}} 
                    className="font-bold flex w-full justify-center hover:bg-blue-300 cursor-pointer rounded-lg border-l-transparent hover:border-white border-l-4 p-4">
                        By Type
                </button>

        </div> 
      }
    </div>
  )
}

export default DropdownList
