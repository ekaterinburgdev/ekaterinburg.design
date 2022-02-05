import classNames from 'classnames/bind';

import styles from './Partners.module.scss';

const cx = classNames.bind(styles);

export default function Partners({ partners }) {
  const sortByPriority = (a, b) => {
    if (a.priority > b.priority) { return -1; }
    if (a.priority < b.priority) { return 1; }
    return 0;
  }

  return (
    <div className={cx('partners')}>
      <div className={cx('partners__list')}>
        {partners
          .filter(({ published }) => published)
          .sort(sortByPriority)
          .map(({ link, name, logo, logoInvert }) =>
            <div className={cx('partners__list-item')} key={link}>
              <a className={cx('partners__link')} href={link} target="_blank">
                <img src={logoInvert[0]} alt="" className={cx('partners__logo')} />
                <img src={logo[0]} alt={name} className={cx('partners__logo', 'partners__logo_color')} loading="lazy" />
              </a>
            </div>
          )}
      </div>

      {/*
      <p className={cx('partners__description', 'partners__description_left')}>
        Мы&nbsp;создаём дизайн-систему Екатеринбурга, которая исключит появление плохого дизайна в&nbsp;городе. Это сделает городскую среду приятнее и&nbsp;комфортнее.
      </p>

      <p className={cx('partners__description', 'partners__description_right')}>
        Чтобы делать это быстрее и&nbsp;эффективнее, мы&nbsp;ищем инвесторов и&nbsp;спонсоров, которые готовы поддержать развитие дизайна Екатеринбурга.
      </p>

      <p className={cx('partners__description', 'partners__description_left')}>
        Обсудить условия и&nbsp;обязанности с&nbsp;нашей стороны с&nbsp;вами готов наш руководитель Паша Омелёхин&nbsp;&mdash; <a href="mailto:pasha@ekateringburg.design">pasha@ekateringburg.design</a>
      </p>
      */}
    </div>
  )
};
