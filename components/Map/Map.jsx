import classNames from 'classnames/bind';

import styles from './Map.module.scss';

const cx = classNames.bind(styles);

export default function Map({ widgetUrl }) {
    return (
        <div className={cx(styles['map'])}>
            <iframe src={widgetUrl} lazy className={cx(styles['map__iframe'])}  />
        </div>
    );
}
