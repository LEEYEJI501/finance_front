import React from 'react';
import { Button } from '@/components/index'; // Button 컴포넌트 경로에 맞게 수정하세요

const BoardDetail = () => {
  const title = '게시글제목';
  const date = '2022 07 19';
  const content = `
    대충 게시글 내용
    게시글
    ㄴㅁㅇ;ㅣ런ㅁㅇ;
    ㅁㄴㅇㄹ
    ㄴㅁ아ㅗㅓㅜㅁㄴㅇ래'ㄴㅁㅇㄹ
]ㄴㅁㅇㄹ
ㄴㅇㄻ
ㄴㄻㅇ
ㄻㄴㅇ
ㅁㄴㄹㅇ
  `;

  return (
    <div className="mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="border-b pb-4 mb-4">
        <span className="text-lg ml-4 font-semibold">{title}</span>
        <span className="float-right text-sm text-gray-500">{date}</span>
      </div>
      <div className="text-gray-700 whitespace-pre-line mb-8">{content}</div>

      {/* 글쓰기 버튼 */}
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

export default BoardDetail;
