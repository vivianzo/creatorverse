import React, { useState } from 'react';
import { supabase } from '../../client';
import {Link} from 'react-router-dom';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!name || !url || !description) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      // Insert new content creator
      const { data, error } = await supabase
        .from('creators')
        .insert([
          {
            name,
            url,
            description,
            imageURL, // imageURL is optional
          },
        ]);

      if (error) {
        throw error; // Throw error to be caught in the catch block
      }

      setSuccessMessage('Content creator added successfully!');
      setName('');
      setUrl('');
      setDescription('');
      setImageURL('');
    } catch (error) {
      console.error('Supabase error:', error); // Log the error for debugging
      setErrorMessage('Error adding content creator: ' + error.message);
    }
  };

  return (
    <div className="">
        <div className='p-4'>
            <Link to="/">
                <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                    back
                </button>
            </Link>
        </div>
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Add a New Content Creator</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
            </label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                URL
            </label>
            <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
            </label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageURL">
                Image URL (optional)
            </label>
            <input
                type="url"
                id="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            </div>
            <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
            Add Creator
            </button>
        </form>
        </div>
        </div>
  );
};

export default AddCreator;
