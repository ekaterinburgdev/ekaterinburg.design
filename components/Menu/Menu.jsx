import classNames from 'classnames/bind';
import { element } from 'prop-types';
import { useEffect } from 'react';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export default function Menu({ items }) {
  useEffect(() => {
    // TODO сделать через useRef
    const linkWithElementList = [...document.querySelectorAll(`.${cx('menu__list-item')}`)].reverse().map(link => {
      const element = document.querySelector(link.getAttribute('href'));
      return { link, element };
    });
    // TODO удалять обработчик, добавить троттлинг
    window.addEventListener('scroll', () => {
      let currentLink = null;

      for (const { link, element } of linkWithElementList) {
        if (isElementInViewport(element)) {
          link.classList.add(cx('menu__list-item_active'));
          currentLink = link;
          break;
        }
      }

      for (const { link } of linkWithElementList) {
        if (currentLink !== link) {
          link.classList.remove(cx('menu__list-item_active'));
        }
      }
    });

  }, []);

  return <>
    {items && (
      <>
        <div className={cx('menu', 'emerge')} data-await="cover" data-duration="1000">
          <div className={cx('menu__logo')}>
            <svg className={cx('menu__logo-image')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 574 574">
              {/*
                <path d="M574 287v1.54c-.68 158-129 285.63-287 285.46C128.49 574 0 445.5 0 287S128.5 0 287 0s287 128.49 287 287z"></path>
              */}
              <path
                fill="#00b4ff"
                d="M34.4 417.43l278.74-278.74-81.13-81.13L34.4 255.17z"
              ></path>
              <path
                fill="#00b400"
                fillRule="evenodd"
                d="M541.58 285.91a199.16 199.16 0 00-182.42 279 285 285 0 0077.13-32.69 115.44 115.44 0 01105.29-162.6h.06a116.05 116.05 0 0119.79 1.7A286.63 286.63 0 00574 288.56a200 200 0 00-32.42-2.65z"
              ></path>
              <path
                fill="#fff"
                d="M349 379.28c0-8.8-6.84-11.23-15.15-11.23h-12.1v22.46h12.1c8.32 0 15.15-2.94 15.15-11.23zm77.2 7.26h44.44V421c-6.25 11.64-20.4 20.72-41.63 20.72-12.49 0-22.48-3.33-27.89-7.49-20.06 12.19-55.06 9.66-67.45-24.13h-11.91v10h8.17v20h-45.79v-20h11.39v-52h-16.39v34.52c0 25.79-18.32 39.93-42 39.93-20.81 0-42-12.47-42-39.93V368.1h-8.74v-20.39H233v20.39h-10v35.78c0 10.39 7.91 16.21 15.4 16.21s14.6-5.4 14.6-16.21V368.1h-12.1v-20.39h98.25c24.63 0 37.06 13.44 37.06 30.53a31.59 31.59 0 01-16.81 27.38c4.72 13.83 19.07 16.56 26 9.9-3.33-6.65-4.58-14.14-4.58-21.63 0-24.68 15.35-47.83 47-47.83 18.3 0 29.34 5.21 38.13 12.55v21.57h-23.34l-.1-9.62c-3.59-2.22-7.79-3.25-13.06-3.25-13.79 0-22.07 9.81-22.07 26.17 0 15 8.75 26.13 22.07 26.54 7.09 0 12.53-1.51 17.9-6.16v-7.71H426.2zM163 411.31a9.33 9.33 0 00-9.5-9.16h-12.56V420H153c6.25 0 10-4.54 10-8.69zm-22.06-27.46H148c5.83 0 8.74-3.74 8.74-7.9s-2.91-7.9-8.74-7.9h-7.08zm48.29 28.7c0 13.73-10 27.46-29.52 27.46H104.3V420h9.58v-52h-9.58v-20.38h48.9c18.87 0 28.12 12.06 28.12 25 0 5.83-2.08 11.65-7.08 17.06 10.82 5 15 13.73 15 22.87zm234.38-153.07h11.21v33.22l-37.09-52.78h-39.58v19.55H369v52h-10.86v20.38H406v-20.38h-10.79v-32l36.25 52.37H461v-72.37h10v-19.55h-47.46v19.55zm-40.67-128.13v30.17h19.6v-10.06h11.12v51.87h-9.54v20.12h46.62v-20.12h-10.06v-51.87h11.12v10.06h20.13v-30.17zm-196 170h-20.66v10.59h-25.42V295.5h23.84v-20.11h-23.84V260h25.42v10.59h20.66v-30.7H104.3V260h10.07v51.87H104.3V332h82.64zM232.47 282h12.4c8.31 0 15.13-3 15.13-11.27 0-8.79-6.84-11.23-15.15-11.23h-12.4zm7.91 49.91h-45.8V311.5h10.83v-52h-10.83v-19.56h56.33c24.63 0 37 13.44 37 30.52a31.63 31.63 0 01-16.65 27.31c1.66 10 10.33 13.73 21.08 13.73h17.21v-52H295v-19.56h55.37v19.56H335.8v52h14.58v20.38h-59.15c-26.81 0-39.51-10.4-45.75-30h-13v9.57h7.9zm92.69-155.51h16.43l-8.5-22.3zm-92.93 47.11h-45.56v-20.15h11.13v-51.87h-11.13v-20.11h46.62v20.11h-9v15.88h9.53c12.19 0 19.6-5.82 19.6-15.88h-8v-20.11h44v20.11H286.2c0 13.77-9.53 25.41-19.07 30.71 2.65 14.29 10.83 21.17 28.84 20.11l20.13-50.81h-6.89v-20.12h51.91l27.55 72h9.53v20.12h-46.62v-20.12H359l-2.12-6.88h-30.73l-2.15 6.88h8.48v20.12h-18.3c-31.79 0-36 0-47.6-4.76-11.13-4.77-19.6-16.41-23.84-31.23h-10.6v15.87h8zm-53.2 0H104.3v-20.15h10.07v-51.87H104.3v-20.11h82.64v30.7h-20.66v-10.59h-25.42v15.36h23.84V187h-23.84v16.41h25.42v-10.63h20.66z"
              ></path>
            </svg>
            Дизайн-код<br />Екатеринбурга
          </div>

          <ul className={cx('menu__list')}>
            {items.map(({ title, link }) =>
              <a href={link} className={cx('menu__list-item')} key={title}>{title}</a>
            )}
          </ul>

          <a className={cx('menu__button')} href="mailto:mail@ekaterinburg.design" target="_blank" rel="noopener noreferrer">Написать нам</a>
        </div>
      </>
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
