import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Alert, {AlertBaseProps, AlertType} from './index';

const defaultProps: AlertBaseProps = {
    className: 'test-alert',
    title: 'alert title',
    message: 'alert message',
    onClose: jest.fn()
}

const testProps: AlertBaseProps = {
    type: AlertType.Success,
    message: 'alert message',
    closable: false
}

const testVisible: AlertBaseProps = {
    title: 'alert title',
    visible: true,
    defaultVisible: false,
    onClose: jest.fn()
}

describe('test Alert component', () => {
    it('should Render the correct Default Alert component', () => {
        const {getByText, container, queryByText} = render(<Alert {...defaultProps} />);
        const element = container.querySelector('.alert');
        const closeElement = getByText('关闭');

        expect(element).toBeInTheDocument();
        expect(closeElement).toBeInTheDocument();
        expect(element).toHaveClass('alert alert-info test-alert');

        // 点击关闭后，onClose()函数执行 整个element从dom中移除
        fireEvent.click(closeElement);
        expect(defaultProps.onClose).toHaveBeenCalled();
        expect(element).not.toBeInTheDocument();

    });

    it('should Render the correct Alert based on different props', () => {
        const {getByText, container, queryByText} = render(<Alert {...testProps} />);
        const element = container.querySelector('.alert');
        const closeElement = queryByText('关闭');

        expect(element).toBeInTheDocument();
        expect(closeElement).not.toBeInTheDocument();
        expect(element).toHaveClass('alert alert-success');
    });

    // 有visible的时候，由visible控制是否关闭
    it('should have visible props then can not close by component', () => {
        const {getByText, container, queryByText} = render(<Alert {...testVisible} />);
        const element = container.querySelector('.alert');
        const closeElement = getByText('关闭');

        expect(element).toBeInTheDocument();
        expect(closeElement).toBeInTheDocument();
        expect(element).toHaveClass('alert alert-info');

        fireEvent.click(closeElement);
        expect(defaultProps.onClose).toHaveBeenCalled();
        expect(element).toBeInTheDocument();

    });
});

