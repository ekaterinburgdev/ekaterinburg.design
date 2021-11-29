
import classNames from 'classnames/bind';

import Image from 'next/image';

import styles from './PostPreview.module.scss'

const cx = classNames.bind(styles);

export default function PostPreview({ title, gallery, highlight }) {
  return (
    <article className={cx('post-preview', { 'post-preview_highlight': highlight })}>
      <a href="#" className={cx('post-preview__title')}>
        <span className={cx('post-preview__title-caption')}>
          {title}
          <span className={cx('post-preview__title-underline')}>{title}</span>
        </span>
      </a>

      {gallery?.map(image => (
        <figure className={cx('post-preview__image')} key={image}>
          <Image src={image}  layout="fill" alt="" loading="eager" />
        </figure>
      ))}
    </article>
  )
};
