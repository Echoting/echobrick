import React, {createContext, useState} from 'react';
import c from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: number) => void;

export interface MenuProps {
    defaultIndex?: number;

    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({index: 0});

export const Menu: React.FC<MenuProps> = props => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        onSelect,
        children
    } = props;

    const [currentActive, setCurrentActive] = useState(defaultIndex);

    const handleClick = (index: number) => {
        setCurrentActive(index);
        if (typeof onSelect === 'function') {
            onSelect(index);
        }
    }

    const menuContext = {
        index: currentActive || 0,
        onSelect: handleClick
    }

    const classes = c('echo-brick-menu', className, {
        'menu-vertical': mode === 'vertical'
    });

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={menuContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu;