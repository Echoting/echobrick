import React from 'react';
import {render, fireEvent, RenderResult, cleanup} from '@testing-library/react';

import Menu, {MenuProps} from './menu';
import MenuItem from './menu-item';

const testProps: MenuProps = {
    defaultIndex: 0,
    className: 'test',
    onSelect: jest.fn()
};

const testVerticalProps: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
};

const GenerateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem index={0}>
                active
            </MenuItem>
            <MenuItem index={1} disabled>
                disabled
            </MenuItem>
            <MenuItem index={2}>
                link3
            </MenuItem>
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu component', () => {
    beforeEach(() => {
        wrapper = render(GenerateMenu(testProps));
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('echo-brick-menu test');

        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item active');
        expect(disabledElement).toHaveClass('menu-item disabled');
    });

    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('link3');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('menu-item active');
        expect(activeElement).not.toHaveClass('active');
        expect(testProps.onSelect).toHaveBeenCalledWith(2);

        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1);

    });

    it('test vertival menu', () => {
        cleanup();
        wrapper = render(GenerateMenu(testVerticalProps));
        menuElement = wrapper.getByTestId('test-menu');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('echo-brick-menu menu-vertical');
    })
})

