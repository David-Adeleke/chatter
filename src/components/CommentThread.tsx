import { useState } from 'react'
import type { CommentThread } from '@/hooks/useComments'
import { useAuth } from '@/features/auth/AuthContext'
import { Link } from 'react-router-dom'

interface CommentThreadProps {
    thread: CommentThread
    onReply: (content: string, parentId: string) => void
    onDelete: (commentId: string) => void
    onEdit: (commentId: string, content: string) => void
}

export default function CommentThreadComponent({
    thread,
    onReply,
    onDelete,
    onEdit,
}: CommentThreadProps) {
    const { user } = useAuth()
    const [replyOpen, setReplyOpen] = useState(false)
    const [replyContent, setReplyContent] = useState('')
    const [editing, setEditing] = useState(false)
    const [editContent, setEditContent] = useState(thread.content)

    const handleReply = () => {
        if (!replyContent.trim()) return
        onReply(replyContent.trim(), thread.id)
        setReplyContent('')
        setReplyOpen(false)
    }

    const handleEdit = () => {
        if (!editContent.trim()) return
        onEdit(thread.id, editContent.trim())
        setEditing(false)
    }

    const isOwner = user?.id === thread.author_id

    return (
        <div>
            <div>
                <Link to={`/@${thread.profiles.username}`}>
                    <img src={thread.profiles.avatar_url ?? '/default-avatar.png'} alt={thread.profiles.username} />
                    <span>{thread.profiles.full_name ?? thread.profiles.username}</span>
                </Link>
                <span>{new Date(thread.created_at).toLocaleDateString()}</span>
            </div>

            {editing ? (
                <div>
                    <textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </div>
            ) : (
                <p>{thread.content}</p>
            )}

            <div>
                {user && !replyOpen && thread.replies.length < 999 && (
                    <button onClick={() => setReplyOpen(true)}>Reply</button>
                )}
                {isOwner && (
                    <>
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={() => onDelete(thread.id)}>Delete</button>
                    </>
                )}
            </div>

            {replyOpen && (
                <div>
                    <textarea
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                    />
                    <button onClick={handleReply}>Post reply</button>
                    <button onClick={() => setReplyOpen(false)}>Cancel</button>
                </div>
            )}

            {thread.replies.length > 0 && (
                <div style={{ marginLeft: '1.5rem' }}>
                    {thread.replies.map(reply => (
                        <div key={reply.id}>
                            <div>
                                <Link to={`/@${reply.profiles.username}`}>
                                    <img src={reply.profiles.avatar_url ?? '/default-avatar.png'} alt={reply.profiles.username} />
                                    <span>{reply.profiles.full_name ?? reply.profiles.username}</span>
                                </Link>
                            </div>
                            <p>{reply.content}</p>
                            {user?.id === reply.author_id && (
                                <button onClick={() => onDelete(reply.id)}>Delete</button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}