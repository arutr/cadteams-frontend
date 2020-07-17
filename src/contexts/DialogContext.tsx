import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogProps } from 'src/components/Dialog';

interface DialogContextProps {
  setDialog: (props: DialogProps) => void;
}

const DialogContext = React.createContext<DialogContextProps>(null);
export const DialogConsumer = DialogContext.Consumer;

export default function DialogProvider({ children }) {
  const [dialog, setDialog] = useState<DialogProps>(null);
  return (
    <DialogContext.Provider value={{ setDialog }}>
      {dialog && <Dialog {...dialog} />}
      {children}
    </DialogContext.Provider>
  );
}

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useDialog() {
  const context = React.useContext<DialogContextProps>(DialogContext);

  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogContext');
  }

  return context;
}
