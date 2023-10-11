
import classNames from 'classnames/bind';

import PostPreview from '../Project';

import styles from './ProjectsList.module.scss'

const cx = classNames.bind(styles);

export default function ProjectsList({ projects }) {
  return (
    <ul className={cx('projects-list')}>
      {projects
        .map((
          {
            id,
            previewGallery,
            previewContrast,
            previewBig,
            siteLink,
            title,
          }) => (
          <li className={cx('projects-list__item', { 'projects-list__item_big': previewBig })} key={title}>
            <PostPreview
              id={id}
              title={title}
              gallery={previewGallery}
              contrast={previewContrast}
              big={previewBig}
              siteLink={siteLink}
            />
          </li>
        ))}
    </ul>
  )
};
