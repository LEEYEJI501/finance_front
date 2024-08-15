import React from 'react';
import { formatDateTime } from '../../../utils/dateUtils';
import { useNavigate } from '@/hooks/useNavigate';
import CommentSection from '../comment/CommentSection';
import { IComment } from '@/types/social';

type PostDetailProps = {
  id: number;
  title: string;
  date: string;
  content: string;
  comments: IComment[] | null;
};

const PostDetail: React.FC<PostDetailProps> = ({ id, title, date, content, comments }) => {
  const { navigateBack } = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl mx-auto p-10 bg-white shadow-2xl rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <button 
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center" 
            onClick={() => navigateBack()}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            뒤로가기
          </button>
        </div>

        <div className="border-b pb-6 mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <span className="text-sm text-gray-500">{formatDateTime(date)}</span>
        </div>

        <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-10">
          {content}
        </div>
        <CommentSection id={ id } comments={comments || []}/>
      </div>
    </div>
  );
};

export default PostDetail;
