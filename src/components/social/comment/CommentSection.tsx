import React, { useState } from 'react';
import { Input, Button } from '@/components/index';
import Comment from './Comment';
import { fetchCreateComment, fetchCreateReply } from '@/services/social';
import { IComment } from '@/types/social';
import { buildCommentTree } from '@/utils/commentUtils';
import { useStorage } from '@/hooks/useStorage';
import { useToast } from "@/contexts/ToastContext";
import constants from '@/constants';

type CommentSectionProps = {
  id: number;
  comments: IComment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ id, comments }) => {
  const [commentTree, setCommentTree] = useState(buildCommentTree(comments));
  const [newComment, setNewComment] = useState('');
  const { user } = useStorage();
  const { showToast } = useToast();

  const handleAddReply = async (parentCommentId: number, replyText: string) => {
    if (replyText.trim() === '') {
      showToast("댓글 내용이 비어있습니다.", constants.TOAST_TYPES.INFO);
      return;
    }

    if (user) {
      const newCommentData = await fetchCreateReply(id, parentCommentId, user.id, user.username, replyText);
      setCommentTree(prev => buildCommentTree([...comments, newCommentData]));
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      showToast("댓글 내용이 비어있습니다.", constants.TOAST_TYPES.INFO);
      return;
    }
    
    if (user) {
      const newCommentData = await fetchCreateComment(id, user.id, user.username, newComment);
      setCommentTree(prev => buildCommentTree([...comments, newCommentData]));
      setNewComment('');
    }
  };

  const totalCommentCount = comments.length;

  return (
    <div className="mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">
        댓글 <span className="text-blue-500">{totalCommentCount}</span>
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
