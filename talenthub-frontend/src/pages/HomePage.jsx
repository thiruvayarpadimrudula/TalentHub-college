import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-center p-10">
      <header className="text-4xl font-bold text-blue-800 mb-4">
        TalentHub@College
      </header>
      <p className="text-lg text-gray-700 mb-8">
        Showcase your projects. Get noticed. Inspire others.
      </p>

      <div className="space-x-4">
        <Link to="/upload">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
            Upload Your Project
          </button>
        </Link>

        <Link to="/explore">
          <button className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700">
            Explore Projects
          </button>
        </Link>
      </div>

      <div className="mt-12 text-sm text-gray-500">
        Made with ❤️ for students, by students.
      </div>
    </div>
  );
};

export default HomePage;
