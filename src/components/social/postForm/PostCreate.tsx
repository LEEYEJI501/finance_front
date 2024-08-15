import React, { useState } from 'react';
import { Input, Button } from '@/components/index';
import { useNavigate } from '@/hooks/useNavigate';
import { fetchCreatePost } from '@/services/social';
import { useToast } from "@/contexts/ToastContext";
import constants from '@/constants';
import { useStorage } from '@/hooks/useStorage';

const PostCreate: React.FC = () => {
  const { getQueryParams, navigateToStockDetail } = useNavigate();
  const { market, code, name } = getQueryParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { showToast } = useToast();
  const { user } = useStorage();

  const handleSubmit = async () => {
    if (title.trim() === '' || content.trim() === '') {
      showToast(
        '제목과 내용을 모두 입력해주세요.', 
        constants.TOAST_TYPES.INFO
      );
      return;
    }

    await handleCreatePost();

    setTitle('');
    setContent('');
    navigateToStockDetail({
      market,
      code,
      name
    });
  };

  const handleCreatePost = async () => {
    if (user) {
      await fetchCreatePost({
        title,
        author: user.username,
        content,
        stockCode: code,
        accountName: name,
        userId: user.id
      });

      showToast(
        '게시글이 성공적으로 작성되었습니다.', 
        constants.TOAST_TYPES.SUCCESS
      );
    }
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-6">게시글 작성</h2>

      <div className="mb-2">
        <span className="mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block mb-4">
          { market }
        </span>
        <span className="mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block mb-4">
          { code }
        </span>
        <span className="mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block mb-4">
          { name }
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
          className="w-full h-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
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
