import React, {useState} from 'react';
import c from 'classnames';
// import {isUndefined} from 'lodash-es';


export enum AlertType {
    Success = 'success',
    Info = 'info',
    Danger = 'danger',
    Warning = 'warning'
}

interface AlertBaseProps {
    type?: AlertType;
    className?: string;

    // 是否有关闭按钮
    closable?: boolean;

    // 是否显示
    visible?: boolean;
    defaultVisible?: boolean;

    // 标题
    title?: string;
    // 内容
    message?: string;

    // 关闭按钮的回调
    onClose?: (visible: boolean) => void;
}

export const Alert: React.FC<AlertBaseProps> = props => {
    const {
        type,
        className,
        closable,
        visible,
        defaultVisible,

        title,
        message,
        onClose
    } = props;

    const classes = c('alert', className, {
        [`alert-${type}`]: type,

    });

    let defaultVisibleState;
    if ('visible' in props) {
        defaultVisibleState = visible;
    } else {
        defaultVisibleState = defaultVisible;
    }

    const [visibleState, setVisibleState] = useState(!!defaultVisibleState);

    const handleClose = (e: React.MouseEvent) => {
        if ('visible' in props) {
            if (typeof onClose === 'function') {
                onClose(visibleState);
            } else {
                console.log('请设置 onClose 方法')
            }
        } else {

            setVisibleState(false);
        }
    };

    if (!visibleState || (!title && !message)) {
        return null;
    }

    return <div
        className={classes}
    >
        {closable ? <span className={'alert-closeX'} onClick={e => {
            handleClose(e);
        }
        }>关闭</span> : null}

        <div className={'alert-message'}>
            {title ? <div className={'alert-headline'}>{title}</div> : null}
            {message ? <div className={'alert-content'}>{message}</div> : null}
        </div>
    </div>
}

Alert.defaultProps = {
    className: '',
    type: AlertType.Info,
    closable: true,
    defaultVisible: true

}

export default Alert;



