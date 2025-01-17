import { useState } from "react";

export const useLocalStorage = (key,initialValue) => {
    const [storedValue, setStoredValue] = useState(()=> {
        if (window.localStorage.getItem(key)) { //*this kinda happens upon mounting of the localstorage anytime window is refreshed 
            return JSON.parse(window.localStorage.getItem(key))
        }
        window.localStorage.setItem(key,JSON.stringify(initialValue));
        return initialValue; 
    })

    const setValue = value => {
        setStoredValue(value);
        window.localStorage.setItem(key,JSON.stringify(value)); 
    }
    return [storedValue, setValue]; 
}