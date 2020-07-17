import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import React, { useState } from 'react';
import { FieldValues, FormContext, useForm } from 'react-hook-form';
import { Label } from 'src/api/User';
import { DialogProps, DialogType } from 'src/components/Dialog';
import { useAuth } from 'src/contexts/AuthProvider';

interface Context {
  editing: boolean;
  handleUpdateSubmit: (event) => Promise<void>;
}

export const ProfileUpdateContext = React.createContext<Context>(null);

interface Props {
  setDialog?: ({ type, message }: DialogProps) => void;
  labelStates?: {
    [key: string]: Label[];
  };
  [key: string]: any;
}

export function removeLabel(labels, dispatch) {
  return (id: number) => dispatch(labels.filter((label) => label.id !== id));
}

export default function ProfileUpdateProvider<F extends FieldValues>({
  children,
  labelStates,
  setDialog,
}: Props) {
  const [editing, setEditing] = useState(false);
  const formMethods = useForm<F>();
  const { updateUser } = useAuth();
  const handleUpdateSubmit = formMethods.handleSubmit(async (values) => {
    setDialog(null);

    try {
      if (editing) {
        let labelValues = {};

        if (labelStates) {
          labelValues = Object.fromEntries(
            Object.entries(labelStates).map(([name, labels]) => (
              ([name, labels.map(({ label }) => ({ label }))])
            )),
          );
        }

        await updateUser({
          ...values,
          ...labelValues,
        });
      }
    } catch (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({
        type: DialogType.Error,
        message: 'Failed to update profile information. Please try again later.',
      });

      if (PHASE_DEVELOPMENT_SERVER) {
        throw error;
      }
    }

    setEditing(!editing);
  });

  return (
    <ProfileUpdateContext.Provider
      value={{
        editing,
        handleUpdateSubmit,
      }}
    >
      <FormContext {...formMethods}>
        {children}
      </FormContext>
    </ProfileUpdateContext.Provider>
  );
}

export function useProfileUpdate() {
  const context = React.useContext<Context>(ProfileUpdateContext);

  if (context === undefined) {
    throw new Error('useProfileUpdate must be used within a ProfileUpdateContext');
  }

  return context;
}
