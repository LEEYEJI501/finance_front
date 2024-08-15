import React, { useState } from 'react';
import { Input, Button } from '@/components/index';

interface Reply {
  author: string;
  date: string;
  text: string;
  replies?: Reply[];
}

interface CommentProps {
  author: string;
  date: string;
  text: string;
  replies?: Reply[];
  onReplyClick: () => void;
  showReplyInput: boolean;
  onAddReply: (replyText: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  author,
  date,
  text,
  replies,
  onReplyClick,
  showReplyInput,
  onAddReply,
}) => {
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (replyText.trim() === '') return;
    onAddReply(replyText);
    setReplyText('');
  };

  return (
    <div className="my-4">
      <div className="flex">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div className="ml-4">
          <div className="text-gray-700">
            <span className="font-semibold">{author}</span>
            <span className="ml-2 text-gray-400 text-sm">{date}</span>
            <Button
              size="small"
              color="none"
              onClick={onReplyClick}
              className="ml-4 text-xs text-blue-400 hover:bg-white"
            >
              댓글달기
            </Button>
          </div>
          <div className="mt-2 text-gray-600">{text}</div>
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
          {/* 답글이 있는 경우 */}
          {replies && replies.length > 0 && (
            <div className="ml-10 mt-4">
              {replies.map((reply, index) => (
                <Comment
                  key={index}
                  {...reply}
                  onReplyClick={() => {}}
                  showReplyInput={false}
                  onAddReply={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Reply[]>([
    {
      author: '관리자1',
      date: '21-09-02 12:22',
      text: 're 1',
      replies: [],
    },
    {
      author: '관리자1',
      date: '21-09-02 12:22',
      text: 're 2',
      replies: [
        {
          author: '관리자1',
          date: '21-09-02 12:22',
          text: 're 2-1',
          replies: [
            {
              author: '관리자1',
              date: '21-09-02 12:22',
              text: 're 2-1-2',
              replies: [],
            },
          ],
        },
        {
          author: '관리자1',
          date: '21-09-02 12:22',
          text: 're 2-2',
          replies: [],
        },
      ],
    },
    {
      author: '관리자1',
      date: '21-09-02 12:22',
      text: 're 3',
      replies: [],
    },
  ]);

  const [replyInputVisible, setReplyInputVisible] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleReplyInput = (index: number) => {
    setReplyInputVisible(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddReply = (index: number, replyText: string) => {
    const newComments = [...comments];
    const newReply: Reply = {
      author: '사용자',
      date: new Date().toLocaleString(),
      text: replyText,
      replies: [],
    };
    newComments[index].replies = [
      ...(newComments[index].replies || []),
      newReply,
    ];
    setComments(newComments);
    toggleReplyInput(index); // 답글 입력 후 입력 창 닫기
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObject: Reply = {
      author: '사용자', // 실제로는 사용자의 이름을 사용
      date: new Date().toLocaleString(),
      text: newComment,
      replies: [],
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');
  };

  return (
    <div className="mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4">
        댓글 <span className="text-blue-500">{comments.length}</span>
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
      {comments.map((comment, index) => (
        <Comment
          key={index}
          {...comment}
          onReplyClick={() => toggleReplyInput(index)}
          showReplyInput={replyInputVisible[index] || false}
          onAddReply={replyText => handleAddReply(index, replyText)}
        />
      ))}
    </div>
  );
};

export default CommentSection;
