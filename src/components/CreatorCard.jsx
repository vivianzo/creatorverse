import React from 'react'
import {useNavigate} from 'react-router-dom';
import { CiCircleInfo, CiEdit } from "react-icons/ci";


const CreatorCard = ({id, name, url, description, imageURL }) => {
  const navigate = useNavigate();

  const handleInfoClick = (id) => {
    navigate(`/creator/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {imageURL && (
        <img className="w-full h-48 object-cover" src={imageURL} alt={`${name}'s image`} />
      )}
      <div className="px-6 py-4">
        <div className='flex flex-row justify-between items-start'>
            <div className="font-bold text-xl mb-2 justify-start">{name}</div>
            <div className='flex flex-row'>
                <div className='cursor-pointer' onClick={() => handleInfoClick(id)}>
                    <CiCircleInfo size={20}/>
                </div>
                <div className='cursor-pointer' onClick={() => handleEditClick(id)}>
                    <CiEdit size={20}/>
                </div>
            </div>
        </div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Visit Profile
        </a>
      </div>
    </div>
  )
}

export default CreatorCard
