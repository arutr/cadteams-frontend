import classNames from 'classnames';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Icon from 'src/components/Icon';

import styles from './Modal.module.scss';

const Context = React.createContext(null);

export function ModalProvider({ className, children, providerOnly }) {
  const modalRef = useRef();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  if (providerOnly) {
    return (
      <div className={className}>
        <Context.Provider value={context}>{children}</Context.Provider>
        <div ref={modalRef} />
      </div>
    );
  }

  return (
    <main className={classNames(styles.container, className)}>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </main>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  providerOnly: PropTypes.bool,
};

ModalProvider.defaultProps = {
  children: null,
  className: null,
  providerOnly: false,
};

interface ModalProps {
  onClose?: () => void,
  children: any,
  className?: string,
}

class Modal extends React.PureComponent<ModalProps> {
  render() {
    const {
      onClose,
      children,
      className,
      ...props
    } = this.props;
    const modalNode = this.context;

    return modalNode
      ? createPortal(
        <div className={classNames(styles.overlay, 'modal-overlay')}>
          <div className={styles.dialog} {...props}>
            <Icon
              name="close"
              aria-label="Close"
              className={styles.close}
              onClick={onClose}
              onKeyDown={onClose}
              role="button"
              tabIndex={0}
            />
            <section className={className}>
              {children}
            </section>
          </div>
        </div>,
        modalNode,
      )
      : null;
  }
}

Modal.contextType = Context;

export default Modal;
