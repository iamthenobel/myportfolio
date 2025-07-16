import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.replace(/['\"]+/g, "") || "";

const initialForm = {
  title: "",
  tags: "",
  coverPhoto: "",
  timeUploaded: new Date().toISOString(),
  commentCount: 0,
  likes: 0,
  content: "",
};

const CreateBlog = () => {
  const [showModal, setShowModal] = useState(true);
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setShowModal(false);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(editId ? "Updating..." : "Submitting...");
    try {
      const url = editId ? `${API_URL.replace(/\/$/, '')}/posts/${editId}` : `${API_URL.replace(/\/$/, '')}/posts`;
      const method = editId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus(editId ? "Blog post updated successfully!" : "Blog post created successfully!");
        setForm(initialForm);
        setEditId(null);
      } else {
        setStatus(editId ? "Failed to update blog post." : "Failed to create blog post.");
      }
    } catch (err) {
      setStatus("An error occurred. Please try again.");
    }
  };

  React.useEffect(() => {
    if (isAuthorized) {
      fetch(`${API_URL.replace(/\/$/, '')}/posts`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [isAuthorized, status]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${API_URL.replace(/\/$/, '')}/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStatus("Post deleted successfully");
        setPosts((posts) => posts.filter((p) => p.id !== id));
      } else {
        setStatus("Failed to delete post.");
      }
    } catch {
      setStatus("Error deleting post.");
    }
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setForm(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-start p-4 gap-6">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Admin Authentication</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-800 focus:border-gray-800 transition-all"
                  placeholder="Enter admin password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-all font-medium"
              >
                Unlock Dashboard
              </button>
              {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
      
      {isAuthorized && (
        <>
          <div className="w-full max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {editId ? 'Edit Post' : 'Create New Post'}
              </h1>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {editId ? `Editing: ${editId}` : 'New Post'}
              </span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Post Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Cover Photo URL</label>
                <input
                  type="text"
                  name="coverPhoto"
                  value={form.coverPhoto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                {form.coverPhoto && (
                  <div className="mt-2">
                    <img 
                      src={form.coverPhoto} 
                      alt="Cover preview" 
                      className="max-h-40 rounded border border-gray-200"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Time Uploaded</label>
                  <input
                    type="text"
                    name="timeUploaded"
                    value={new Date(form.timeUploaded).toLocaleString()}
                    readOnly
                    className="w-full px-4 py-3 text-gray-500 border border-gray-200 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Comment Count</label>
                  <input
                    type="number"
                    name="commentCount"
                    value={form.commentCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    min={0}
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Likes</label>
                  <input
                    type="number"
                    name="likes"
                    value={form.likes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    min={0}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Content (HTML)</label>
                  <span className="text-xs text-gray-500">Supports HTML markup</span>
                </div>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={12}
                  className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 font-mono text-sm"
                  placeholder="Paste or type HTML content here..."
                  required
                />
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setEditId(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Reset Form
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors font-medium"
                >
                  {editId ? 'Update Post' : 'Publish Post'}
                  <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {status && (
                <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                  status.includes('success') ? 'bg-green-100 text-green-700' : 
                  status.includes('Failed') ? 'bg-red-100 text-red-700' : 
                  'bg-blue-100 text-blue-700'
                }`}>
                  {status}
                </div>
              )}
            </form>
          </div>
          
          <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Blog Posts</h2>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {posts.length} posts
              </span>
            </div>
            
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-2 text-gray-500">No posts found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-1">{post.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(post.timeUploaded).toLocaleDateString()} • {post.commentCount} comments • {post.likes} likes
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateBlog;