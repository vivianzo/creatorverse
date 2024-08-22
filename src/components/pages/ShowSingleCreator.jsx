import React from 'react'
import { supabase } from "../../client";
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ShowSingleCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
  
    useEffect(() => {
      fetchCreator();
    }, [id]);
  
    async function fetchCreator() {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();  
        setCreator(data);
    }
  
    if (!creator) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="max-w-lg mx-auto p-4">
        <div className="py-10">
        <Link to="/view-creators">
            <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                back
            </button>
        </Link>
        </div>
        <img src={creator.imageURL} alt={creator.name} className="w-full h-64 object-cover rounded-md" />
        <h1 className="text-3xl font-bold mt-4">{creator.name}</h1>
        <p className="text-gray-700 mt-2">{creator.description}</p>
        <button></button>
        <div className="py-4 flex flex-row justify-evenly item-center">
            <a href={creator.url} className= "bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
            Visit {creator.name}'s site
            </a>
            <Link to={`/edit/${creator.id}`}><button className="bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-700">Edit Creator</button></Link>
        </div>
        
        
      </div>
    );
}

export default ShowSingleCreator
