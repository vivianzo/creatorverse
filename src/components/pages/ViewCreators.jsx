import React from 'react'
import CreatorCard from '../CreatorCard'
import {Link} from 'react-router-dom';


const ViewCreators = ({ creators }) => {
    return (
        <div className='flex flex-row'>
            <div className='px-5 py-3'>
                <Link to="/">
                    <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                        back
                    </button>
                </Link>
                {creators.length === 0 ? (
                    <div className='text-3xl text-blue-500 font-bold'>
                        No creators found
                    </div>  
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {creators.map((creator) => (
                        <div key={creator.id}>
                            <CreatorCard
                            id = {creator.id}
                            name={creator.name}
                            url={creator.url}
                            description={creator.description}
                            imageURL={creator.imageURL}
                            />
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
      );
    };

export default ViewCreators
