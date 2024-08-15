import React, { useState } from 'react';
import { Input, Button } from '@/components/index';
import { IComment } from '@/types/social';

interface CommentProps {
  comment: IComment & { replies?: IComment[] };
  onAddReply: (commentId: number, replyText: string) => void;
  depth?: number; // 댓글의 깊이 (대댓글 들여쓰기 용도)
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onAddReply,
  depth = 0, // 기본 깊이를 0으로 설정
}) => {
  const [replyText, setReplyText] = useState('');
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplySubmit = () => {
    if (replyText.trim() === '') return;
    onAddReply(comment.id, replyText);
    setReplyText('');
    setShowReplyInput(false);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(prevLikes => prevLikes - 1);
    } else {
      setLikes(prevLikes => prevLikes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className={`my-4 ${depth > 0 ? `ml-${depth * 4}` : ''}`}>
      <div className="flex">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div className="ml-4">
          <div className="text-gray-700">
            <span className="font-semibold">{comment.userId}</span>
            <span className="ml-2 text-gray-400 text-sm">{comment.createdAt}</span>
            <Button
              size="small"
              color="none"
              onClick={() => setShowReplyInput(!showReplyInput)} // 클릭 시, 자신의 상태를 토글함
              className="ml-4 text-xs text-blue-400 hover:bg-white"
            >
              댓글달기
            </Button>
          </div>
          <div className="mt-2 text-gray-600">{comment.content}</div>
          <div className="flex items-center mt-2">
            <svg
              onClick={handleLikeClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isLiked ? 'red' : 'none'}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 cursor-pointer"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="ml-2 text-sm text-gray-600">{likes}</span>
          </div>
          {showReplyInput && (
            <div className="flex space-x-4 mt-4 mb-8">
              <Input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="답글을 입력하세요."
              />
              <Button
                size="small"
                color="none"
                onClick={handleReplySubmit}
                className="whitespace-nowrap border"
              >
                답글 작성
              </Button>
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-4 mt-4">
              {comment.replies.map(reply => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onAddReply={onAddReply}
                  depth={depth + 1} // 깊이를 1 증가시켜 대댓글 들여쓰기
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
