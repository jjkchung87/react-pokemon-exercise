import React, {useState, useEffect} from 'react'

const useLocalStorageState = (key, initialValue) => {
    const [state, setState] = useState(() => {
        let jsonValue
        try {
           jsonValue = JSON.parse(
            window.localStorage.getItem(key) || JSON.stringify(initialValue)
           )
        } catch (error) {
            jsonValue = initialValue
        }
        return jsonValue
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]


}

export default useLocalStorageState;