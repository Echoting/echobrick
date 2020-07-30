import React, {createContext, useState} from 'react';
import c from 'classnames';

import MenuItem, {MenuItemProps} from './menu-item';
import SubMenu from './sub-menu';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;

    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;

    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    mode?: MenuMode;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'});

export const Menu: React.FC<MenuProps> = props => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        onSelect,
        children,
        defaultOpenSubMenus
    } = props;

    const [currentActive, setCurrentActive] = useState(defaultIndex);

    const handleClick = (index: string) => {
        setCurrentActive(index);
        if (typeof onSelect === 'function') {
            onSelect(index);
        }
    };

    const menuContext: IMenuContext = {
        index: currentActive || '0',
        mode,
        onSelect: handleClick,
        defaultOpenSubMenus
    };

    const classes = c('echo-brick-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {

            // 给MenuItem 和 SubMenu 增加displayName属性
            // 通过类型断言给child断言为MenuItemProps？SubMenuProps?
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const {displayName} = childElement.type;

            // 使用react 克隆元素，往menu-item上增加index属性
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            } else {
                console.error('Warning: Menu has a child which is not available');
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={menuContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
};

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
};

export default Menu;