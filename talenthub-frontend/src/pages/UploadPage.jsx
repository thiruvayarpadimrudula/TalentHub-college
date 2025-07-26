import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('link', link);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Project uploaded successfully!');
      console.log(res.data);

      // Clear form
      setName('');
      setEmail('');
      setTitle('');
      setDescription('');
      setTags('');
      setLink('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage('Error uploading project');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Your Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required className="w-full border p-2 rounded" />
        <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border p-2 rounded" />
        <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border p-2 rounded" />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full border p-2 rounded h-24" />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-full border p-2 rounded" />
        <input type="url" placeholder="Project Link (e.g. GitHub)" value={link} onChange={e => setLink(e.target.value)} className="w-full border p-2 rounded" />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Project</button>
        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default UploadPage;
