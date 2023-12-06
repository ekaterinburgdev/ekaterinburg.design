import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx('footer')}>
      Дизайн-код Екатеринбурга

      <div className={cx('footer__year')}>
        2017<span className={cx('footer__year-dash')}><span>—</span></span>{currentYear}
      </div>

      <div className={cx('requisites')}>
        <span>Автономная некоммерческая организация «Центр развития территорий, архитектуры и дизайна „Исеть“». Адрес: 620014, Россия, Свердловская обл., г. Екатеринбург, ул. Малышева, д. 21/1, ком. 30. ОГРН 1236600001538, ИНН 6671254540, КПП 667101001, ОКПО 49794112. Дата регистрации: 16 января 2023, <nobr>р/с 40703810001500002835</nobr> в ООО «Банк Точка», <nobr>к/с 30101810745374525104</nobr>, БИК 044525104. <a href="/ano/">Документы и отчёты</a>.</span>
      </div>
    </footer>
  )
};
