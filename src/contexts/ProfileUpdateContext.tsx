import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Label } from 'src/api/User';
import { DialogType } from 'src/components/Dialog';
import { useAuth } from 'src/contexts/AuthProvider';
import { useDialog } from 'src/contexts/DialogContext';

interface Context {
  editing: boolean;
  handleUpdateSubmit: (event) => Promise<void>;
}

export const ProfileUpdateContext = React.createContext<Context>(null);

interface Props {
  children: any;
  labelStates?: {
    [key: string]: Label[];
  };
}

export function removeLabel(labels, dispatch) {
  return (id: number) => dispatch(labels.filter((label) => label.id !== id));
}

export default function ProfileUpdateProvider({
  children,
  labelStates,
}: Props) {
  const [editing, setEditing] = useState(false);
  const formMethods = useForm();
  const { updateUser } = useAuth();
  const { setDialog } = useDialog();
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
      <FormProvider {...formMethods}>
        {children}
      </FormProvider>
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
