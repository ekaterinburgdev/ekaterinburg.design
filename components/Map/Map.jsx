import classNames from 'classnames/bind';

import styles from './Map.module.scss';

const cx = classNames.bind(styles);

export default function Map({ widgetUrl }) {
    return <iframe src={widgetUrl} className={cx(styles['map'])} lazy="true" />;
}
