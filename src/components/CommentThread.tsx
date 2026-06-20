import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import type { CommentThread } from '@/hooks/useComments'
import Avatar from '@/components/Avatar'

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
  const isOwner = user?.id === thread.author_id

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

  return (
    <div className="comment">
      <div className="comment-header">
        <Link to={`/@${thread.profiles.username}`} className="comment-author">
          <Avatar
            src={thread.profiles.avatar_url ?? '/default-avatar.png'}
            username={thread.profiles.username}
            className="comment-avatar"
            size={96}
          />
          <div>
            <span className="comment-author-name">
              {thread.profiles.full_name ?? thread.profiles.username}
            </span>
            <time className="comment-date">
              {new Date(thread.created_at).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </time>
          </div>
        </Link>
      </div>

      {editing ? (
        <div className="comment-edit">
          <textarea
            className="comment-textarea"
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            rows={3}
          />
          <div className="comment-edit-actions">
            <button className="comment-btn-submit" onClick={handleEdit}>Save</button>
            <button className="comment-btn-text" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <p className="comment-body">{thread.content}</p>
      )}

      <div className="comment-actions">
        {user && (
          <button
            className="comment-btn-text"
            onClick={() => setReplyOpen(r => !r)}
          >
            Reply
          </button>
        )}
        {isOwner && !editing && (
          <>
            <button className="comment-btn-text" onClick={() => setEditing(true)}>Edit</button>
            <button className="comment-btn-text comment-btn-danger" onClick={() => onDelete(thread.id)}>Delete</button>
          </>
        )}
      </div>

      {replyOpen && (
        <div className="comment-reply-compose">
          <textarea
            className="comment-textarea"
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            rows={3}
          />
          <div className="comment-edit-actions">
            <button
              className="comment-btn-submit"
              onClick={handleReply}
              disabled={!replyContent.trim()}
            >
              Reply
            </button>
            <button className="comment-btn-text" onClick={() => setReplyOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {thread.replies.length > 0 && (
        <div className="comment-replies">
          {thread.replies.map(reply => (
            <div key={reply.id} className="comment comment--reply">
              <div className="comment-header">
                <Link to={`/@${reply.profiles.username}`} className="comment-author">
                  <img
                    src={reply.profiles.avatar_url ?? '/default-avatar.png'}
                    alt={reply.profiles.username}
                    className="comment-avatar"
                  />
                  <div>
                    <span className="comment-author-name">
                      {reply.profiles.full_name ?? reply.profiles.username}
                    </span>
                    <time className="comment-date">
                      {new Date(reply.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </time>
                  </div>
                </Link>
              </div>
              <p className="comment-body">{reply.content}</p>
              {user?.id === reply.author_id && (
                <div className="comment-actions">
                  <button
                    className="comment-btn-text comment-btn-danger"
                    onClick={() => onDelete(reply.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}