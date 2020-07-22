import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Button, {ButtonProps, ButtonSize, ButtonType} from './index';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    className: 'test-class',
    size: ButtonSize.Large,
    btnType: ButtonType.Danger,
    children: null
}

const disableProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn(),
    children: null
}

describe('test Button component', () => {
    it('should render the correct Default button', function () {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');

        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('should render the correct button based on different props', function () {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-danger btn-lg test-class');
    });

    it('should render a link when btnType equals link and href is provided', function () {
        const wrapper = render(<Button btnType={ButtonType.Link} href={'www.baidu.com'}>Link</Button>);
        const element = wrapper.getByText('Link');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    });

    it('should render a disabled button when disabled set to true', function () {
        const wrapper = render(<Button {...disableProps}>Nice</Button>);
        const element = wrapper.getByText('Nice') as HTMLButtonElement;

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disableProps.onClick).not.toHaveBeenCalled();
    });
});