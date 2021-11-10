import classNames from 'classnames/bind';
import { element } from 'prop-types';
import { useEffect } from 'react';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export default function Menu({ items }) {
  useEffect(() => {
    // TODO сделать через useRef
    const linkWithElementList = [...document.querySelectorAll(`.${cx('menu__item')}`)].reverse().map(link => {
      const element = document.querySelector(link.getAttribute('href'));
      return { link, element };
    });
    // TODO удалять обработчик, добавить троттлинг
    window.addEventListener('scroll', () => {
      let currentLink = null;

      for (const { link, element } of linkWithElementList) {
        if (isElementInViewport(element)) {
          link.classList.add(cx('menu__item_active'));
          currentLink = link;
          break;
        }
      }

      for (const { link } of linkWithElementList) {
        if (currentLink !== link) {
          link.classList.remove(cx('menu__item_active'));
        }
      }
    });

  }, []);

  return <>
    {items && (
      <ul className={cx('menu')}>
        {items.map(({ title, link }) =>
          <a href={link} className={cx('menu__item')}>{title}</a>
        )}
      </ul>
    )}
  </>
};

function isElementInViewport(el, percentVisible = 10) {
  let
    rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};
