
import classNames from 'classnames/bind';

import PostPreview from '../PostPreview';

import styles from './PostPreviewGrid.module.scss'

const cx = classNames.bind(styles);

export default function PostPreviewGrid({ posts }) {
  const sortByPriority = (a, b) => {
    if (a.priority > b.priority) { return -1; }
    if (a.priority < b.priority) { return 1; }
    return 0;
  }

  return (
    <ul className={cx('post-preview-grid')}>
      {posts
        .filter(({ published }) => published)
        .sort(sortByPriority)
        .map(({ id, highlight, title, preview: gallery }) => (
          <li className={cx('post-preview-grid__item', { 'post-preview-grid__item_highlight': highlight })} key={title}>
            <PostPreview id={id} title={title} gallery={gallery} highlight={highlight} />
          </li>
        ))}
    </ul>
  )
};
