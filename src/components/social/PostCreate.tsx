import React, { useState } from 'react';
import { Input, Button } from '@/components/index';

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    console.log('게시글 작성:', { title, content });

    setTitle('');
    setContent('');
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-6">게시글 작성</h2>

      <div className="mb-2">
        <span className="mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block mb-4">
          종목이름
        </span>
        <span className="mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block mb-4">
          종목코드
        </span>
        <span className="mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block mb-4">
          마켓종류
        </span>
      </div>

      <div className="mb-4">
        <Input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="w-full h-48 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <Button
          size="medium"
          color="slate"
          onClick={handleSubmit}
          className="whitespace-nowrap"
        >
          작성하기
        </Button>
      </div>
    </div>
  );
};

export default PostCreate;
