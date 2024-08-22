import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'; 
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditCreator = () => {
  const { id } = useParams(); 
  

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setName(data.name);
          setUrl(data.url);
          setDescription(data.description);
          setImageURL(data.imageURL || ''); // Handle optional imageURL
        }
      } catch (error) {
        console.error('Error fetching content creator:', error);
        setErrorMessage('Error fetching content creator.');
      }
    };

    fetchCreator();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    if (!name || !url || !description) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
  
    try {
      // Update content creator in the database
      const { data, error } = await supabase
        .from('creators')
        .update({ name, url, description, imageURL })
        .eq('id', id);
  
      if (error) {
        throw error;
      }
  
      setSuccessMessage('Content creator updated successfully!');
      fetchCreator(); // Refetch the data to update the form with the latest info
  
    } catch (error) {
      console.error('Supabase error:', error);
      setErrorMessage('Error updating content creator: ' + error.message);
    }
  };
  
  const fetchCreator = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error) {
        throw error;
      }
  
      if (data) {
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL || '');
      }
    } catch (error) {
      console.error('Error fetching content creator:', error);
      setErrorMessage('Error fetching content creator.');
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
      useNavigate('/'); 
      setSuccessMessage('Content creator deleted successfully!');
      

    } catch (error) {
      console.error('Supabase error:', error);
      setErrorMessage('Error deleting content creator: ' + error.message);
    }
  };

  return (
    <div>
        <div className='p-4'>
            <Link to="/">
                <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                    back
                </button>
            </Link>
        </div>
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Edit Content Creator</h2>
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
            <div className='flex flex-row justify-evenly'>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update Creator
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-700">
                    Delete Creator
                </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default EditCreator;
