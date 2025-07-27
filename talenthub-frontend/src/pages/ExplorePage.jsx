import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ✅ Use base API for clean requests
const API = axios.create({
  baseURL: 'https://talenthub-college-backend1.onrender.com/api',
});

const ExplorePage = () => {
  const [projects, setProjects] = useState([]);
  const [upvotedProjects, setUpvotedProjects] = useState(
    JSON.parse(localStorage.getItem('upvotedProjects')) || []
  );

  // ✅ Fetch projects from backend
  useEffect(() => {
    API.get('/projects')
      .then((res) => {
        console.log('Fetched Projects:', res.data);
        setProjects(res.data);
      })
      .catch((err) => console.error('Error fetching projects:', err));
  }, []);

  // ✅ Handle Upvote / Unvote
  const handleToggleVote = async (id) => {
    const alreadyVoted = upvotedProjects.includes(id);
    const url = alreadyVoted ? `/projects/${id}/unvote` : `/projects/${id}/upvote`;

    try {
      const res = await API.put(url); // 🔁 Use API instance here

      // 🔄 Update vote count in UI
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, upvotes: res.data.upvotes } : p))
      );

      // 🧠 Save vote locally
      const updatedVotes = alreadyVoted
        ? upvotedProjects.filter((pid) => pid !== id)
        : [...upvotedProjects, id];

      setUpvotedProjects(updatedVotes);
      localStorage.setItem('upvotedProjects', JSON.stringify(updatedVotes));
    } catch (err) {
      console.error('Vote toggle failed:', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Projects</h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects yet. Be the first to upload!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-200"
            >
              {project.image && (
                <img
                  src={`https://talenthub-college-backend1.onrender.com${project.image}`}
                  alt={project.title}
                  style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                />
              )}

              <h2 className="text-xl font-semibold mt-2">{project.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{project.description}</p>

              {project.tags?.length > 0 && (
                <p className="text-sm text-blue-500 mt-2">{project.tags.join(', ')}</p>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-indigo-600 text-sm mt-3 hover:underline"
                >
                  🔗 View Project
                </a>
              )}

              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-500 text-sm">Upvotes: {project.upvotes}</span>
                <button
                  onClick={() => handleToggleVote(project._id)}
                  className={`px-3 py-1 rounded text-sm text-white ${
                    upvotedProjects.includes(project._id)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {upvotedProjects.includes(project._id) ? '🔄 Unvote' : '⬆️ Upvote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
