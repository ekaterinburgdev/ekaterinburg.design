
import classNames from 'classnames/bind';

import Image from 'next/image';

import styles from './PostPreview.module.scss'

const cx = classNames.bind(styles);

export default function PostPreview({ id, title, gallery, highlight }) {
  return (
    <article className={cx('post-preview', { 'post-preview_highlight': highlight })}>
      {gallery?.map(image => (
        <figure className={cx('post-preview__image')} key={image}>
          <img src={image} alt="" />
        </figure>
      ))}
    </article>
  )
};
