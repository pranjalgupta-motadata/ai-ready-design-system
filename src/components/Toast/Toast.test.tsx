import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toast, toast } from './Toast';

describe('Toast', () => {
  it('renders Toast component', () => {
    const { container } = render(<Toast />);
    // Sonner renders in a portal with specific class
    const toaster = container.querySelector('ol') || document.querySelector('ol');
    expect(toaster || container.firstChild).toBeTruthy();
  });

  it('renders with custom position', () => {
    const { container } = render(<Toast position="top-center" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with theme', () => {
    const { container } = render(<Toast theme="dark" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with custom duration', () => {
    const { container } = render(<Toast duration={5000} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders with close button', () => {
    const { container } = render(<Toast closeButton />);
    expect(container.firstChild).toBeTruthy();
  });

  it('exports toast function', () => {
    expect(typeof toast).toBe('function');
    expect(typeof toast.success).toBe('function');
    expect(typeof toast.error).toBe('function');
    expect(typeof toast.warning).toBe('function');
    expect(typeof toast.info).toBe('function');
    expect(typeof toast.promise).toBe('function');
  });

  it('toast function creates notifications', () => {
    render(<Toast />);
    const toastId = toast('Test message');
    expect(toastId).toBeDefined();
  });

  it('toast.success creates success notification', () => {
    render(<Toast />);
    const toastId = toast.success('Success message');
    expect(toastId).toBeDefined();
  });

  it('toast.error creates error notification', () => {
    render(<Toast />);
    const toastId = toast.error('Error message');
    expect(toastId).toBeDefined();
  });

  it('toast.warning creates warning notification', () => {
    render(<Toast />);
    const toastId = toast.warning('Warning message');
    expect(toastId).toBeDefined();
  });

  it('toast.info creates info notification', () => {
    render(<Toast />);
    const toastId = toast.info('Info message');
    expect(toastId).toBeDefined();
  });

  it('toast.loading creates loading notification', () => {
    render(<Toast />);
    const toastId = toast.loading('Loading message');
    expect(toastId).toBeDefined();
  });

  it('toast.message creates message notification', () => {
    render(<Toast />);
    const toastId = toast.message('Message notification');
    expect(toastId).toBeDefined();
  });

  it('toast.custom creates custom notification', () => {
    render(<Toast />);
    const CustomComponent = () => <div>Custom content</div>;
    const toastId = toast.custom(CustomComponent);
    expect(toastId).toBeDefined();
  });
});
