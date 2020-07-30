import React, {useContext, useState} from 'react';
import c from 'classnames';

import {MenuContext} from './menu';

export interface MenuItemProps {
    className?: string;
    index?: string;
    disabled?: boolean;
    style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = props => {
    const {index, className, disabled, style, children} = props;
    const context = useContext(MenuContext);

    const classes = c('menu-item', className, {
        'disabled': disabled,
        'active': context.index === index
    });

    const handleCLick = () => {
        if (typeof context.onSelect === 'function' && !disabled) {
            console.log(555, index);
            context.onSelect(index || '0');
        }
    }


    return <li className={classes} style={style} onClick={handleCLick}>
        {children}
    </li>
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;