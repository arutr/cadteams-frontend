import React, {
  useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Modal.module.scss';

const Context = React.createContext(null);

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <div className={styles.container}>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </div>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node,
};

ModalProvider.defaultProps = {
  children: null,
};

interface ModalProps {
  onClose: () => void,
  children: any,
}

class Modal extends React.PureComponent<ModalProps> {
  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflowY = null;
    document.documentElement.style.overflowY = null;
  }

  render() {
    const { onClose, children, ...props } = this.props;
    const modalNode = this.context;

    return modalNode
      ? createPortal(
        <div className={styles.overlay}>
          <div className={styles.dialog} {...props}>
            {children}
            <span
              aria-label="Close"
              className={classNames('icon', styles.close)}
              onClick={onClose}
              onKeyPress={onClose}
              role="button"
              tabIndex={0}
            />
          </div>
        </div>,
        modalNode,
      )
      : null;
  }
}

Modal.contextType = Context;

export default Modal;
