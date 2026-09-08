import { createContext, useContext } from 'react';

export interface RadioGroupContextValue {
  value: string | null;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
