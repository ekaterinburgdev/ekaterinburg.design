
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';

import styles from './PostPreview.module.scss'

const cx = classNames.bind(styles);

export default function PostPreview({ title, siteLink, gallery, big, contrast }) {
  const galleryRef = useRef(null);

  useEffect(() => {
    const images = galleryRef.current.querySelectorAll('img');

    if (images.length > 1) {
      let startRandomTimeout;
      let changeSlidesInterval;
      let current = 0;

      startRandomTimeout = setTimeout(() => {
        changeSlidesInterval = setInterval(function () {
          for (let i = 0; i < images.length; i++) {
            images[i].classList.remove(cx('post-preview__image_active'));
          }

          current = (current != images.length - 1) ? current + 1 : 0;
          images[current].classList.add(cx('post-preview__image_active'));
        }, 4000);
      }, Math.floor(Math.random() * 1500) + 1)

      return () => {
        clearTimeout(startRandomTimeout)
        clearInterval(changeSlidesInterval)
      };
    }
  }, [])

  const isNewPageLink = siteLink.charAt(0) !== '/';

  return (
    <article className={cx(
      'post-preview', {
      'post-preview_big': big,
      'post-preview_contrast': contrast,
      'post-preview_link': siteLink,
    })}
    >
      <div className={cx('post-preview__gallery')} ref={galleryRef}>
        {gallery?.map(image => <img className={cx('post-preview__image')} src={image} key={image} loading="lazy" alt="" />)}
      </div>

      <span className={cx('post-preview__caption')} aria-hidden="true" data-caption-title={title}>
        {title.split(' ').map(word => (
          <span className={cx('post-preview__caption-word')} key={word}>{word} </span>)
        )}
      </span>

      {siteLink &&
        <a
          href={siteLink}
          target={isNewPageLink ? '_blank' : null}
          rel={isNewPageLink ? 'noopener noreferrer' : null}
          className={cx('post-preview__link-area')}
        >
          {title}
        </a>}
    </article>
  )
};
