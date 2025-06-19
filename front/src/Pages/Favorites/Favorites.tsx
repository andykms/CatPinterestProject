import { useSelector, useDispatch } from "../../services/store";
import { PostsGallery } from "../../components/PostsGallery/PostsGallery";
import { getLikes } from "../../slices/favouriteSlice/favouriteSlice";
import styles from "./Favorites.module.css";
import { IFavourite } from "../../types/TFavourite";
import { useUniqly } from "../../hooks/useUniqly";
import { getFavorite } from "../../slices/favouriteSlice/favouriteSlice";
import { deleteLikeAction } from "../../actions/ApiActions";
import { useEffect } from "react";
import { getFavoritesCatsAction } from "../../actions/ApiActions";
import { getIsLoadFavorite } from "../../slices/favouriteSlice/favouriteSlice";


export const Favorites = () => {
  const dispatch = useDispatch();

  const likes = useSelector(getLikes);
  const likesIndexes = useUniqly<IFavourite>(likes, "cat_id");
  const idLoaded = useSelector(getIsLoadFavorite);
  const favoriteCats = useSelector(getFavorite);

  useEffect(() => {
    dispatch(getFavoritesCatsAction(likes.map((like) => like.cat_id)));
  }, [likes]);

  const deleteLike = (id: string) => {
    dispatch(deleteLikeAction(id))
  };

  return (
    <div className={styles.galleryContainer}>
      {idLoaded ? 
      <div className={styles.loader}>...Загружаем любимых котиков...</div> :
      <PostsGallery posts={favoriteCats} onClickLike={deleteLike} likes={likesIndexes as Set<string>} />}
    </div>
  );
};
