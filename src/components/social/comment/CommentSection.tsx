import React, { useState } from 'react';
import { Input, Button } from '@/components/index';
import Comment from './Comment';
import { fetchCreateComment, fetchCreateReply } from '@/services/social';
import { IComment } from '@/types/social';
import { buildCommentTree } from '@/utils/commentUtils';
import { useStorage } from '@/hooks/useStorage';

type CommentSectionProps = {
  id: number;
  comments: IComment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ id, comments }) => {
  const [commentTree, setCommentTree] = useState(buildCommentTree(comments));
  const [newComment, setNewComment] = useState('');
  const { user } = useStorage();

  const handleAddReply = async (parentCommentId: number, replyText: string) => {
    if (replyText.trim() === '') return;

    if (user) {
      const newCommentData = await fetchCreateReply(id, parentCommentId, user.id, replyText);
      setCommentTree(prev => buildCommentTree([...prev, newCommentData]));
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    
    if (user) {
      const newCommentData = await fetchCreateComment(id, user.id, newComment);
      setCommentTree(prev => buildCommentTree([...prev, newCommentData]));
      setNewComment('');
    }
  };

  return (
    <div className="mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">
        댓글 <span className="text-blue-500">{commentTree.length}</span>
      </h3>
      <div className="flex space-x-4 mt-4 mb-8">
        <Input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <Button
          size="small"
          color="none"
          onClick={handleAddComment}
          className="whitespace-nowrap border"
        >
          댓글 작성
        </Button>
      </div>
      {commentTree.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onAddReply={handleAddReply}
        />
      ))}
    </div>
  );
};

export default CommentSection;
