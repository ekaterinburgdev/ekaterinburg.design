
import classNames from 'classnames/bind';

import Image from 'next/image';

import styles from './PostPreview.module.scss'

const cx = classNames.bind(styles);

export default function PostPreview({ id, title, gallery, highlight, contrast }) {
  return (
    <article className={cx('post-preview', { 'post-preview_highlight': highlight })}>
      <a href={id} className={cx('post-preview__title')}>
        <span className={cx('post-preview__title-caption', { 'post-preview__title-caption_contrast' : contrast })}>
          {title}
          <span className={cx('post-preview__title-underline', { 'post-preview__title-underline_contrast' : contrast })}>{title}</span>
        </span>

        {gallery?.map(image => (
          <figure className={cx('post-preview__image')} key={image}>
            <img src={image} loading="lazy" alt="" />
          </figure>
        ))}
      </a>
    </article>
  )
};
