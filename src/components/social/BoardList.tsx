import React from 'react';

const BoardList = () => {
  const items = [
    { id: 4, title: '탭 메뉴 이미지', author: 'asd', date: '2017-12-06' },
    { id: 3, title: '응원합니다!', author: 'asdf', date: '2017-11-20' },
    { id: 2, title: 'asdfasdf', author: 'asdf', date: '2017-11-20' },
    { id: 4, title: '탭 메뉴 이미지', author: 'asd', date: '2017-12-06' },
    { id: 3, title: '응원합니다!', author: 'asdf', date: '2017-11-20' },
    { id: 2, title: 'asdfasdf', author: 'asdf', date: '2017-11-20' },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-2 bg-gray-100 text-black rounded-full px-4 py-1 inline-block mb-4">
        관련 게시글
      </div>
      <table className="w-full text-sm">
        {/* <thead>
          <tr className="border-b">
            <th className="py-2 text-center">No</th>
            <th className="text-center">Title</th>
            <th className="text-center">Author</th>
            <th className="text-center">Date</th>
          </tr>
        </thead> */}
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="">
              <td className="py-2 text-left text-gray-400">{item.id}</td>
              <td className="text-left">{item.title}</td>
              <td className="text-center text-gray-400">{item.author}</td>
              <td className="text-right text-gray-400 w-36">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardList;
