
import classNames from 'classnames/bind';

import Image from 'next/image';

import styles from './PostPreview.module.scss'

const cx = classNames.bind(styles);

export default function PostPreview({ title, gallery, highlight }) {
  return (
    <article className={cx('post-preview', { 'post-preview_highlight': highlight })}>
      <h2 className={cx('post-preview__title')}>
        {title}
      </h2>

      {gallery?.map(image => (
        <figure className={cx('post-preview__image')} key={image}>
          <Image src={image} width="100%" height="100%" alt="" />
        </figure>
      ))}
    </article>
  )
};
