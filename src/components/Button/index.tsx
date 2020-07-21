import React, {AnchorHTMLAttributes, ButtonHTMLAttributes} from 'react';
import c from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    href?: string;
    children: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = NativeButtonProps & AnchorButtonProps;

const Button: React.FC<ButtonProps> = props => {
    const {
        btnType,
        size,
        disabled,
        className,
        href,
        children,
        ...restProps
    } = props;

    const classes = c('btn', {
        className,
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })

    if (btnType === ButtonType.Link) {
        return (
            <a
                {...restProps}
                className={classes}
                href={href}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                {...restProps}
                className={classes}
                disabled={disabled}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button;