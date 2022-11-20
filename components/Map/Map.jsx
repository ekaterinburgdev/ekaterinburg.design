import classNames from 'classnames/bind';

import styles from './Map.module.scss';

const cx = classNames.bind(styles);

export default function Map({ widgetUrl }) {
    return <iframe src={widgetUrl} lazy className={cx(styles['map'])} />;
}
