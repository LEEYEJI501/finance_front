import React, { useEffect, useState } from "react";
import { fetchGetPosts } from '@/services/social';
import { IPost } from "@/types/social";
import Pagination from "@/components/common/Pagination";
import constants from "@/constants";

const BoardList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(constants.DEFAULT_PAGING.PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(constants.DEFAULT_PAGING.PAGESIZE);

  useEffect(() => {
    const loadPostList = async () => {
      const { posts, total_pages } = await fetchGetPosts();
      setPosts(posts)
      setTotalPages(total_pages)
    };

    loadPostList();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1); 
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); 
  };

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
          {posts.map(post => (
            <tr key={post.id} className="">
              <td className="py-2 text-left text-gray-400">{post.id}</td>
              <td className="text-left">{post.title}</td>
              <td className="text-center text-gray-400">{post.author}</td>
              <td className="text-right text-gray-400 w-36">{post.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageRangeDisplayed={5}
        pageSizeOptions={[10, 20, 50, 100]} 
      />
    </div>
  );
};

export default BoardList;
