import { createContext, useContext, useReducer, useState } from 'react';

type LightContextType = {
  isOn: boolean;
  toggleLight: () => void;
};
export const LightContext = createContext<LightContextType>({
  isOn: true,
  toggleLight: () => undefined,
});

const initialState = {
  isOn: true,
};

type ActionType =
  | {
      type: 'switch_on';
    }
  | {
      type: 'switch_off';
    };

function reducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'switch_on': {
      return { ...state, isOn: true };
    }
    case 'switch_off': {
      return { ...state, isOn: false };
    }
    default: {
      throw new Error(`Action undefined: ${JSON.stringify(action)}`);
    }
  }
}

export default function LightContextProvider({ children }: { children: React.ReactNode }) {
  // const [isOn, setIsOn] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  function toggleLight() {
    if (state.isOn) {
      dispatch({ type: 'switch_off' });
    } else {
      dispatch({ type: 'switch_on' });
    }
  }

  const value = { isOn: state.isOn, toggleLight };

  return <LightContext value={value}>{children}</LightContext>;
}

export function useLight() {
  return useContext(LightContext);
}
