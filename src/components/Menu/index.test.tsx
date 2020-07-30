import React from 'react';
import {render, fireEvent, RenderResult, cleanup, wait} from '@testing-library/react';

import Menu, {MenuProps} from './menu';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';

const testProps: MenuProps = {
    defaultIndex: '0',
    className: 'test',
    onSelect: jest.fn()
};

const testVerticalProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
};

const createStyleFile = () => {
    const cssFile: string = `
        .echo-brick-submenu {
            display: none;
        }
        .echo-brick-submenu.menu-opened {
            display: block;
        }
    `;

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}

const GenerateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                link3
            </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

let wrapper: RenderResult,
    wrapperVertical: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
    beforeEach(() => {
        wrapper = render(GenerateMenu(testProps));
        wrapper.container.append(createStyleFile());

        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('echo-brick-menu test');

        // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);

        expect(activeElement).toHaveClass('menu-item active');
        expect(disabledElement).toHaveClass('menu-item disabled');
    });

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('link3');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('menu-item active');
        expect(activeElement).not.toHaveClass('active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');

        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1');

    });

    it('should show dropDown items hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
        const dropDownElement = wrapper.getByText('drop1');
        fireEvent.mouseEnter(dropDownElement);
        await wait(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible();
        });

        fireEvent.click(wrapper.getByText('drop1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');

        fireEvent.mouseLeave(dropDownElement);
        await wait(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible();
        });
    });
});

describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapperVertical = render(GenerateMenu(testVerticalProps));
        wrapperVertical.container.append(createStyleFile());
    });

    it('test vertival menu render', () => {
        menuElement = wrapperVertical.getByTestId('test-menu');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('echo-brick-menu menu-vertical');
    });

    it('should show dropDown Menu when click on SubMenu for vertical mode', () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
        const dropDownElement = wrapper.getByText('dropdown');
        // 第一遍点击出现
        fireEvent.click(dropDownElement);
        expect(wrapper.queryByText('drop1')).toBeVisible();
        // 第二遍点击隐藏
        fireEvent.click(dropDownElement);
        expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });

    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        expect(wrapperVertical.queryByText('opened1')).toBeVisible();
    })
});

