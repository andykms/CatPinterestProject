import { IPost } from "../../types/TPost";

export default interface PostsGalleryProps {
  posts: IPost[];
  onClickLike: (id: string, isLiked: boolean) => void;
  likes: Set<string>;
}