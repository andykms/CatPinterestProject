import styles from './Post.module.css';
import PostProps from './type';
import { memo } from 'react';

export const Post = memo((props: PostProps) => {
  return (
    <div className={styles.post}>
      <img src={props.imageUrl} alt={props.description} className={styles.postImage} loading='lazy'/>
      <div className={styles.postDescription}>
        {props.children}
      </div>
    </div>
  );
});