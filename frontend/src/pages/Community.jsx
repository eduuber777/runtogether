import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const Community = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await api.get('/posts');
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        try {
            const { data } = await api.post('/posts', { content: newPost });
            setPosts([data, ...posts]);
            setNewPost('');
            toast.success('Publicación creada');
        } catch (error) {
            toast.error('Error al crear publicación');
        }
    };

    const handleLike = async (postId) => {
        try {
            await api.post(`/posts/${postId}/like`);
            setPosts(posts.map(p =>
                p.id === postId ? { ...p, likes: p.likes + 1 } : p
            ));
        } catch (error) {
            toast.error('Error al dar like');
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm('¿Eliminar esta publicación?')) return;

        try {
            await api.delete(`/posts/${postId}`);
            setPosts(posts.filter(p => p.id !== postId));
            toast.success('Publicación eliminada');
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const handleComment = async (postId, content) => {
        if (!content.trim()) return;

        try {
            const { data } = await api.post(`/posts/${postId}/comments`, { content });
            setPosts(posts.map(p => {
                if (p.id === postId) {
                    return {
                        ...p,
                        comments: [data, ...p.comments],
                        _count: { comments: p._count.comments + 1 }
                    };
                }
                return p;
            }));
        } catch (error) {
            toast.error('Error al comentar');
        }
    };

    if (loading) return <div className="text-center py-10">Cargando...</div>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Muro Social</h1>
                <p className="text-gray-600">Comparte tus experiencias con la comunidad</p>
            </div>

            {/* Create Post */}
            {user && (
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleCreatePost} className="space-y-4">
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="¿Qué estás pensando?"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            rows="3"
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={!newPost.trim()}>
                                Publicar
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        currentUser={user}
                        onLike={handleLike}
                        onDelete={handleDelete}
                        onComment={handleComment}
                    />
                ))}

                {posts.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                        No hay publicaciones aún. ¡Sé el primero en compartir!
                    </div>
                )}
            </div>
        </div>
    );
};

const PostCard = ({ post, currentUser, onLike, onDelete, onComment }) => {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleSubmitComment = (e) => {
        e.preventDefault();
        onComment(post.id, commentText);
        setCommentText('');
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {post.user.photoUrl ? (
                        <img
                            src={post.user.photoUrl}
                            alt={post.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            {post.user.name.charAt(0)}
                        </div>
                    )}
                    <div>
                        <div className="font-semibold">{post.user.name}</div>
                        <div className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                </div>
                {currentUser && (currentUser.id === post.userId || currentUser.role === 'ADMIN') && (
                    <button
                        onClick={() => onDelete(post.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Post Content */}
            <p className="text-gray-800 mb-4 whitespace-pre-line">{post.content}</p>

            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full rounded-lg mb-4"
                />
            )}

            {/* Post Actions */}
            <div className="flex items-center space-x-6 pt-4 border-t">
                <button
                    onClick={() => onLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes}</span>
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post._count?.comments || 0}</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4 pt-4 border-t space-y-4">
                    {/* Comment Form */}
                    {currentUser && (
                        <form onSubmit={handleSubmitComment} className="flex space-x-2">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Escribe un comentario..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button type="submit" disabled={!commentText.trim()}>
                                Enviar
                            </Button>
                        </form>
                    )}

                    {/* Comments List */}
                    {post.comments && post.comments.length > 0 && (
                        <div className="space-y-3">
                            {post.comments.map(comment => (
                                <div key={comment.id} className="flex space-x-2">
                                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                        <div className="font-semibold text-sm">{comment.user.name}</div>
                                        <p className="text-gray-700">{comment.content}</p>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {new Date(comment.createdAt).toLocaleDateString('es-ES')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Community;
