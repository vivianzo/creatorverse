import React from 'react'
import { Link } from 'react-router-dom';

const Header = (creators) => {
    return(
        <div className="bg-blue-600 h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-white text-5xl font-bold mb-8">Welcome to the Creatorverse</h1>
            <div className="flex space-x-4">
                <Link to="/add-creator">
                    <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                    Add Creator
                    </button>
                </Link>
                <Link to="/view-creators">
                    <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                    View creators 
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default Header
