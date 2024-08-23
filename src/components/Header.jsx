import React from 'react'
import { Link } from 'react-router-dom';
import { supabase } from "../client";
import { useState, useEffect } from 'react';
import CreatorCard from './CreatorCard';

const Header = () => {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        getCreators();
    }, []);

    async function getCreators() {
        const { data } = await supabase.from("creators").select().limit(5);
        setCreators(data);
    }

    return (
        <div className=''>
            <div className="bg-blue-600 min-h-[66.6667vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-white text-5xl font-bold mb-8">Welcome to the Creatorverse</h1>
                <div className="flex space-x-4">
                    <Link to="/add-creator">
                        <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                            Add Creator
                        </button>
                    </Link>
                    <Link to="/view-creators">
                        <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                            View Creators
                        </button>
                    </Link>
                </div>
            </div>
            <div className="bg-blue-700 w-full py-4">
                <h2 className="text-white text-xl font-bold text-center">Featured Creators</h2>
                <div className="flex justify-center space-x-4 mt-4">
                    {creators.length > 0 ? (
                        creators.map((creator) => (
                            <CreatorCard
                                key={creator.id}
                                name={creator.name}
                                url={creator.url}
                                description={creator.description}
                                imageURL={creator.imageURL}
                            />
                        ))
                    ) : (
                        <p className="text-white text-center">No creators to display</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
