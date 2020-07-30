import React, {useContext, useState} from 'react';
import c from 'classnames';

import {MenuContext} from './menu';

export interface SubMenuProps {
    index?: string,

    // subMenu item name
    title: string,
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = props => {
    const {index, title, children, className} = props;

    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;

    const [menuOpen, setOpen] = useState(isOpened);

    const classes = c('menu-item sub-menu-item', className, {
        'active' : context.index === index,
        'sub-menu-vertical': context.mode === 'vertical'
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    };

    let timer: any = null;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300);
    };

    const clickEvent = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    const hoverEvent = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)},
    } : {}

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<SubMenuProps>;
            const {displayName} = childElement.type;

            if (displayName === 'SubMenu' || displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            } else {
                console.error('Warning: SubMenu has a child which is not available');
            }
        });

        return <ul className={c('echo-brick-submenu', menuOpen && 'menu-opened')}>
            {childrenComponent}
        </ul>
    };

    return <li className={classes} {...hoverEvent}>
        <div className='submenu-title' {...clickEvent}>
            {title}
        </div>
        {renderChildren()}
    </li>
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;