import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange ,handleSearch, onClearSearch }) => {
  return (
    <div className="w-40 sm:w-60 md:w-80 flex  items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
          onChange={onClearSearch}
          
        />
      )}
      <IoMdSearch   className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3" 
      onClick={handleSearch}/>
      
    </div>
  )
}

export default SearchBar
