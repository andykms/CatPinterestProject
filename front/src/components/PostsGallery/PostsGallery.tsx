import { Post } from "../ui/Post/Post";
import { Like } from "../ui/Like/Like";
import { memo } from "react";
import PostsGalleryProps from "./type";

export const PostsGallery = memo((props: PostsGalleryProps) => {
  const { posts, onClickLike, likes } = props;
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} imageUrl={post.url}>
          <Like onClick={() => onClickLike(post.id, likes.has(post.id))} isLiked={likes.has(post.id)}/>
        </Post>
      ))}
    </>
  );
});