import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Send, Star, Calendar, Clock, Film } from 'lucide-react';

import { Movie, getMovies } from '../../api/getMovies';
import { CommentItem, getComments } from '../../api/getComments';
import { postComment } from '../../api/postComment';

const MovieWithComments = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: ''
  });
  const [error, setError] = useState('');
  const [loadingMovies, setLoadingMovies] = useState(true);

  // Load movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.movies);
        if (response.movies.length > 0) {
          setSelectedMovie(response.movies[0]);
        }
      } catch (err) {
        setError('Failed to load movies');
        console.error(err);
      } finally {
        setLoadingMovies(false);
      }
    };
    fetchMovies();
  }, []);

  // Fetch comments when "Show Comments" is clicked
  const loadComments = async () => {
    if (!selectedMovie) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await getComments();
      const movieComments = response.comments.filter(c => c.movie_id === selectedMovie._id);
      setComments(movieComments);
      setShowComments(true);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.text.trim()) {
      setError('All fields are required');
      return;
    }

    if (!selectedMovie) return;

    setSubmitting(true);
    setError('');

    try {
      const response = await postComment({
        name: formData.name,
        email: formData.email,
        text: formData.text,
        movie_id: selectedMovie._id
      });

      const newComment = {
        _id: response.inserted_id,
        name: formData.name,
        email: formData.email,
        text: formData.text,
        movie_id: selectedMovie._id,
        date: new Date().toISOString()
      };

      // Add new comment to the list immediately
      setComments([newComment, ...comments]);
      
      // Reset form
      setFormData({ name: '', email: '', text: '' });
      setShowCommentForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      loadComments();
    } else {
      setShowComments(false);
      setShowCommentForm(false);
    }
  };

  if (loadingMovies) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading movies...</div>
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">No movies available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Movie Card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          {/* Movie Header with Poster */}
          <div className="relative">
            {selectedMovie.poster && (
              <div className="absolute inset-0 opacity-20">
                <img 
                  src={selectedMovie.poster} 
                  alt=""
                  className="w-full h-full object-cover blur-2xl"
                />
              </div>
            )}
            
            <div className="relative flex flex-col md:flex-row gap-8 p-8">
              {selectedMovie.poster && (
                <div className="flex-shrink-0">
                  <img 
                    src={selectedMovie.poster} 
                    alt={selectedMovie.title}
                    className="w-64 h-96 object-cover rounded-2xl shadow-2xl ring-2 ring-white/20"
                  />
                </div>
              )}
              
              <div className="flex-1 text-white">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {selectedMovie.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  {selectedMovie.year && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur">
                      <Calendar size={18} />
                      <span className="font-medium">{selectedMovie.year}</span>
                    </div>
                  )}
                  {selectedMovie.runtime && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur">
                      <Clock size={18} />
                      <span className="font-medium">{selectedMovie.runtime} min</span>
                    </div>
                  )}
                  {selectedMovie.imdb?.rating && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full backdrop-blur border border-yellow-500/30">
                      <Star size={18} fill="currentColor" className="text-yellow-400" />
                      <span className="font-bold text-yellow-300">{selectedMovie.imdb.rating}/10</span>
                    </div>
                  )}
                </div>
                
                {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedMovie.genres.map(genre => (
                      <span key={genre} className="px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/30 text-purple-100 rounded-full text-sm font-semibold backdrop-blur">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                
                {selectedMovie.plot && (
                  <p className="text-lg text-gray-200 leading-relaxed mb-6">
                    {selectedMovie.plot}
                  </p>
                )}
                
                {selectedMovie.directors && selectedMovie.directors.length > 0 && (
                  <div className="mb-3">
                    <span className="text-purple-300 font-semibold">Director: </span>
                    <span className="text-gray-300">{selectedMovie.directors.join(', ')}</span>
                  </div>
                )}
                
                {selectedMovie.cast && selectedMovie.cast.length > 0 && (
                  <div className="mb-3">
                    <span className="text-purple-300 font-semibold">Cast: </span>
                    <span className="text-gray-300">{selectedMovie.cast.slice(0, 4).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Show Comments Button */}
          <div className="px-8 pb-8">
            <button
              onClick={toggleComments}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg transition-all disabled:opacity-50 shadow-lg hover:shadow-purple-500/50"
            >
              <MessageCircle size={24} />
              {loading ? 'Loading...' : showComments ? 'Hide Comments' : 'Show Comments'}
              {showComments ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl backdrop-blur">
                {error}
              </div>
            )}

            {/* Comments Section */}
            {showComments && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <MessageCircle size={32} className="text-purple-400" />
                    Comments ({comments.length})
                  </h2>
                  {!showCommentForm && (
                    <button
                      onClick={() => setShowCommentForm(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/50"
                    >
                      <Send size={20} />
                      Add Comment
                    </button>
                  )}
                </div>

                {/* Add Comment Form */}
                {showCommentForm && (
                  <div className="p-6 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl backdrop-blur border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Film size={24} className="text-purple-400" />
                      Write a Comment
                    </h3>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur"
                      />
                      
                      <input
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur"
                      />
                      
                      <textarea
                        placeholder="Your comment"
                        value={formData.text}
                        onChange={(e) => setFormData({...formData, text: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 backdrop-blur"
                      />
                      
                      <div className="flex gap-3">
                        <button
                          onClick={handleSubmitComment}
                          disabled={submitting}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg"
                        >
                          {submitting ? 'Submitting...' : 'Submit Comment'}
                        </button>
                        <button
                          onClick={() => setShowCommentForm(false)}
                          className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl font-bold transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments List */}
                {comments.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageCircle size={64} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 text-xl">No comments found on this movie</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <div key={comment._id} className="p-6 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-2xl backdrop-blur border border-white/10 hover:border-purple-500/30 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-bold text-white text-lg">{comment.name}</p>
                            {comment.date && (
                              <p className="text-sm text-purple-300">
                                {new Date(comment.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-200 leading-relaxed">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieWithComments;
