import { Post } from "../../ui/Post/Post";
import { useSelector, useDispatch } from "../../../services/store";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./InfiniteGallery.module.css";
import { getCats, isPeak } from "../../../slices/catSlice/catSlice";
import { getCatsAction } from "../../../actions/ApiActions";
import { paginate, getLastCats } from "../../../slices/catSlice/catSlice";
import { Like } from "../../ui/Like/Like";
import { useEffect } from "react";
import { useMemo } from "react";
import { getLikes } from "../../../slices/favouriteSlice/favouriteSlice";
import { addLikeAction, deleteLikeAction } from "../../../actions/ApiActions";
import { useState } from "react";

export const InfiniteGallery = () => {

  const cats = useSelector(getCats);
  const isInLimit = useSelector(isPeak);

  const likes = useSelector(getLikes);

  const [hashLikes, setHashLikes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const set: Set<string> = new Set();
    likes?.forEach((like) => set.add(like.cat_id));
    setHashLikes(set);
  }, [likes]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatsAction());
    return () => {
      
    };
  }, [dispatch]);

  const onNext = () => {
    dispatch(paginate());
    dispatch(getCatsAction());
  };

  const onClickLike = (id: string, hasLike: boolean) => {
    hasLike ? dispatch(deleteLikeAction(id)) : dispatch(addLikeAction(id));
  };
  return (
    <InfiniteScroll
      dataLength={cats.length}
      next={onNext}
      hasMore={!isInLimit}
      loader={<div  className={styles.loader}><h4>... загружаем еще котиков ...</h4></div>}
      className={styles.galleryContainer}
    >
      {cats.map((post) => (
        <Post key={post.id} imageUrl={post.url}>
          <Like onClick={() => onClickLike(post.id, hashLikes.has(post.id))} isLiked={hashLikes.has(post.id)} />
        </Post>
      ))}
    </InfiniteScroll>
  );
};
