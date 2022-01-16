
import classNames from 'classnames/bind';

import styles from './PostPreview.module.scss'

const cx = classNames.bind(styles);

export default function PostPreview({ title, siteLink, gallery, highlight, contrast }) {
  return (
    <article className={cx(
      'post-preview', {
      'post-preview_highlight': highlight,
      'post-preview_contrast': contrast,
      'post-preview_link': siteLink,
    })}
    >
      <div className={cx('post-preview__gallery')}>
        {gallery?.map(image => <img className={cx('post-preview__image')} src={image} key={image} alt="" />)}
      </div>

      <span className={cx('post-preview__caption')} aria-hidden="true" data-caption-title={title}>
        {title.split(' ').map(word => (
          <span className={cx('post-preview__caption-word')} key={word}>{word} </span>)
        )}
      </span>

      {siteLink && <a href={siteLink} className={cx('post-preview__link-area')}>{title}</a>}
    </article>
  )
};
