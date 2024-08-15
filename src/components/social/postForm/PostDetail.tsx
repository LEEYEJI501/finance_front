import React from 'react';
import { Button } from '@/components/index'; 

type PostDetailProps = {
  title: string;
  date: string;
  content: string;
};

const PostDetail: React.FC<PostDetailProps> = ({ title, date, content }) => {
  return (
    <div className="mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="border-b pb-4 mb-4">
        <span className="text-lg ml-4 font-semibold">{title}</span>
        <span className="float-right text-sm text-gray-500">{date}</span>
      </div>
      <div className="text-gray-700 whitespace-pre-line mb-8">{content}</div>

      <div className="flex justify-end">
        <Button
          size="small"
          color="slate"
          className="text-sm px-3 py-2"
          onClick={() => alert('글쓰기 버튼 클릭됨')}
        >
          글쓰기
        </Button>
      </div>
    </div>
  );
};

export default PostDetail;
