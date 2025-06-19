import { useSelector, useDispatch } from "../../services/store";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./InfiniteGallery.module.css";
import { getCats, isPeak } from "../../slices/catSlice/catSlice";
import { getCatsAction } from "../../actions/ApiActions";
import { paginate } from "../../slices/catSlice/catSlice";
import { getLikes } from "../../slices/favouriteSlice/favouriteSlice";
import { addLikeAction, deleteLikeAction } from "../../actions/ApiActions";
import { useUniqly } from "../../hooks/useUniqly";
import { IFavourite } from "../../types/TFavourite";
import { PostsGallery } from "../../components/PostsGallery/PostsGallery";

export const InfiniteGallery = () => {

  const cats = useSelector(getCats);
  const isInLimit = useSelector(isPeak);

  const likes = useSelector(getLikes);

  const likesIndexes = useUniqly<IFavourite>(likes, "cat_id");

  const dispatch = useDispatch();

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
      <PostsGallery posts={cats} onClickLike={onClickLike} likes={likesIndexes as Set<string>} />
    </InfiniteScroll>
  );
};
