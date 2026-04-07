import type { ComponentProps } from 'react';
import { useContext, useId } from 'react';
import './Toggle.css';
import { LightContext } from '../context/LightContext';

type ToggleProps = ComponentProps<'input'> & {
  name: string;
  label: string;
};

export default function Toggle({ label, ...rest }: ToggleProps) {
  const { toggleLight } = useContext(LightContext);

  const ownID = useId();
  const id = rest.id ?? ownID;
  return (
    <label htmlFor={id} className='label'>
      <span>{label}</span>
      <span className='toggle'>
        <input type='checkbox' id={id} {...rest} onChange={toggleLight} />
      </span>
    </label>
  );
}
