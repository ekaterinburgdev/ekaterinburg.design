
import classNames from 'classnames/bind';

import PostPreview from '../PostPreview';

import styles from './PostPreviewGrid.module.scss'

const cx = classNames.bind(styles);

export default function PostPreviewGrid({ posts }) {
  return (
    <ul className={cx('post-preview-grid')}>
      {posts.map(({ id, highlight, title, preview: gallery }) => (
        <li className={cx('post-preview-grid__item', { 'post-preview-grid__item_highlight': highlight })} key={title}>
          <PostPreview id={id} title={title} gallery={gallery} highlight={highlight} />
        </li>
      ))}
    </ul>
  )
};
