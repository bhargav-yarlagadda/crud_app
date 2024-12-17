'use client'

import { useRouter } from 'next/navigation'; // Import useRouter hook
import React, { useState } from 'react';

const Page = () => {
  const router = useRouter(); // Initialize the router hook
  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Here, you can handle the data, such as making an API request
    const formData = { title, description };

    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create topic');
      }

      const data = await res.json();
      console.log('Topic created:', data);

      // Optionally reset the form fields after submission
      setTitle('');
      setDescription('');

      // Redirect using useRouter hook
      router.push('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, maybe show a message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add New Topic
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title} // Bind value to state
              onChange={(e) => setTitle(e.target.value)} // Update state on change
              placeholder="Enter title"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description} // Bind value to state
              onChange={(e) => setDescription(e.target.value)} // Update state on change
              placeholder="Enter description"
              rows={3}
              style={{ scrollbarWidth: 'none' }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
