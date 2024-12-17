import Link from 'next/link'
import React from 'react'
const Navbar = () => {
  return (
    <div className="px-8 py-4 ">
      <div className="py-4 px-6 flex justify-between items-center rounded-md bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg">
        <span className="text-xl font-bold tracking-wide">
          CRUD APP
        </span>        
        <Link  
        href="/addTopic"
        className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300 ease-in-out shadow-sm">
          Add Topic
        </Link>
      </div>
    </div>
  )
}

export default Navbar
