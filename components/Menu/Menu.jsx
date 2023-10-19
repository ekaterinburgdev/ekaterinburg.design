import { useEffect, useRef } from 'react';
import throttle from '../../lib/utils/thottle';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export default function Menu({ items }) {
  const menuList = useRef(null);

  useEffect(() => {
    const linkWithElementList = [
      ...menuList.current.querySelectorAll(`.${cx('menu__list-item')}`)
    ]
      .reverse()
      .map(link => {
        const element = document.querySelector(link.getAttribute('href'));
        return { link, element };
      });

    const throttledHandleScroll = throttle(() => {
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
    }, 100);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    }
  }, []);

  return <>
    {items && (
      <>
        <div className={cx('menu')}>
          <div className={cx('menu__logo')}>
            <svg className={cx('menu__logo-image')} viewBox="0 0 574 574" xmlns="http://www.w3.org/2000/svg"><path d="m287 0c158.506 0 287 128.494 287 287 0 158.506-128.494 287-287 287-158.506 0-287-128.494-287-287 0-158.506 128.494-287 287-287z"/><path d="m312.065 144.648-278.008 278.007a284.572 284.572 0 0 1 -33.722-122.07l233.857-233.858z" fill="#00b4ff"/><path d="m531.381 285.756c-105.675 0-191.337 85.673-191.333 191.347a191.345 191.345 0 0 0 21.046 87.235 285.7 285.7 0 0 0 74.62-31.809 110.6 110.6 0 0 1 95.667-166.078 108.266 108.266 0 0 1 30.182 4.21 282.566 282.566 0 0 0 12.389-80.169 191.922 191.922 0 0 0 -42.571-4.736z" fill="#00b400" fill-rule="evenodd"/><path d="m190.915 225.993h-79.329v-19.309h9.66v-49.791h-9.66v-19.311h79.329v29.472h-19.831v-10.161h-24.407v14.733h22.884v19.309h-22.884v15.754h24.407v-10.162h19.831zm51.067 0h-43.732v-19.309h10.677v-49.791h-10.677v-19.311h44.75v19.311h-8.641v15.242h9.153c11.695 0 18.813-5.59 18.813-15.242h-7.625v-19.311h42.2v19.311h-10.68a35.463 35.463 0 0 1 -18.305 29.471c2.541 13.719 10.388 20.326 27.678 19.309l19.324-48.773h-6.617v-19.318h49.832l26.444 69.1h9.153v19.309h-44.747v-19.307h7.118l-2.036-6.607h-29.5l-2.035 6.607h8.135v19.309h-17.559c-30.514 0-34.508 0-45.7-4.573-10.677-4.573-18.813-15.753-22.884-29.978h-10.169v15.242h7.63zm89.212-45.226h15.766l-8.136-21.343zm-88.981 149.288h-43.963v-19.564h10.4v-49.915h-10.4v-18.776h54.071c23.646 0 35.571 12.9 35.571 29.3a30.338 30.338 0 0 1 -15.99 26.213c1.594 9.581 9.922 13.182 20.24 13.182h16.515v-49.919h-13.994v-18.776h53.155v18.772h-13.993v49.918h13.993v19.564h-56.778c-25.739 0-37.932-9.984-43.918-28.756h-12.507v9.184h7.592v19.572zm-7.6-47.918h11.91c7.976 0 14.542-2.814 14.542-10.783 0-8.443-6.568-10.784-14.542-10.784h-11.91zm-43.7 18.613h-19.829v10.163h-24.407v-15.754h22.884v-19.309h-22.884v-14.736h24.407v10.163h19.831v-29.477h-79.329v19.31h9.66v49.794h-9.66v19.309h79.329zm188.148-163.168v28.961h18.813v-9.65h10.677v49.795h-9.151v19.305h44.75v-19.309h-9.659v-49.791h10.677v9.652h19.322v-28.963zm39.047 122.994h10.76v31.9l-35.6-50.669h-38v18.763h10.421v49.916h-10.421v19.564h45.958v-19.564h-10.355v-30.7l34.8 50.267h28.379v-69.477h9.627v-18.766h-45.563v18.766zm-225 146.948c0 13.176-9.627 26.356-28.338 26.356h-53.184v-19.165h9.193v-49.915h-9.193v-19.565h46.939c18.109 0 26.994 11.576 26.994 23.959a23.628 23.628 0 0 1 -6.8 16.374 23.073 23.073 0 0 1 14.391 21.956zm-46.356-27.552h6.8a7.624 7.624 0 1 0 0-15.171h-6.8zm21.181 26.356a8.957 8.957 0 0 0 -9.119-8.79h-.073-11.99v17.175h11.592a9.019 9.019 0 0 0 9.592-8.385zm252.677-23.773h42.656v33.035c-6 11.18-19.581 19.892-39.962 19.892a45.722 45.722 0 0 1 -26.766-7.182 43.887 43.887 0 0 1 -64.746-23.166h-11.441v9.581h7.849v19.169h-43.964v-19.169h10.939v-49.915h-15.74v33.144c0 24.752-17.584 38.331-40.365 38.331-19.978 0-40.359-11.973-40.359-38.331v-33.144h-8.392v-19.565h44.763v19.565h-9.6v34.344a14.924 14.924 0 0 0 14.266 15.556c.175.008.35.013.525.014a14.1 14.1 0 0 0 14.064-14.129 14.4 14.4 0 0 0 -.077-1.439v-34.346h-11.593v-19.561h94.314c23.645 0 35.57 12.894 35.57 29.3a30.331 30.331 0 0 1 -16.137 26.288c4.532 13.278 18.308 15.894 24.926 9.5a46.283 46.283 0 0 1 -4.4-20.768c0-23.691 14.736-45.917 45.155-45.917a52.876 52.876 0 0 1 36.608 12.05v20.712h-22.38l-.1-9.236a22.979 22.979 0 0 0 -12.532-3.121c-13.243 0-21.187 9.415-21.187 25.123 0 14.372 8.4 25.079 21.187 25.475a24.053 24.053 0 0 0 17.181-5.909v-7.407h-20.272v-18.775zm-74.11-6.972c0-8.443-6.568-10.784-14.541-10.784h-11.615v21.567h11.612c7.975 0 14.544-2.82 14.544-10.783z" fill="#fff"/></svg>

            Дизайн-код<br />Екатеринбурга
          </div>

          <ul className={cx('menu__list')} ref={menuList}>
            {Object.entries(items).map(([ link, title ]) =>
              <a href={`#${link}`} className={cx('menu__list-item')} key={title}>{title}</a>
            )}
          </ul>

          <a className={cx('menu__button')} href="mailto:mail@ekaterinburg.design">Написать нам</a>
        </div>
      </>
    )}
  </>
};


function isElementInViewport(el, percentVisible = 10) {
  let rect = el.getBoundingClientRect(),
    windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};
