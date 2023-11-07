import React, {useState} from 'react';

const useFlip = (initialValue = true) => {
    const [state, setState] = useState(initialValue);
    const toggleState = () => {
        setState(state => !state);
    }

    return [state, toggleState]

}

export default useFlip;