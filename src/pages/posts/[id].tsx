import React, { useEffect, useState } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { fetchGetPostDetail } from '@/services/social';
import { IPost } from '@/types/social';
import PostDetail from '@/components/social/postForm/PostDetail';

const PostDetailPage: React.FC = () => {
  const { getQueryParams } = useNavigate();
  const { id } = getQueryParams();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const loadPostDetail = async () => {
      if (id) {
        const postDetail = await fetchGetPostDetail(Number(id));
        setPost(postDetail);
      }
    };

    loadPostDetail();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostDetail
      title={post.title}
      date={post.createdAt}
      content={post.content}
    />
  );
};

export default PostDetailPage;