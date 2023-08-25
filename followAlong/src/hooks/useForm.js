import axios from "axios"; 
import { useLocalStorage } from "./useLocalStorage";

export const useForm = (key,initialValue,output,setOutput) => {
    const [values,setValues] = useLocalStorage(key,initialValue); //*custom hooks are the equivalent to components for this, it's like everything is component based

    const clearForm = (e) => {
        if (e) e.preventDefault();
        setValues(initialValue); 
    }

    const change = (e) => {
        localStorage.setItem([e.target.name], e.target.value)
       setValues({...values,
    [e.target.name] : e.target.value})
    };

    //!import info, see another way to deal with this, every form could have a different request with what they want to do with their data. THis is good if a bunch of forms want to do this
    const submit = e => {
       e.preventDefault();
       const newData  = Object.assign({},values);
       axios.post( "https://reqres.in/api/users",newData) 
       .then(res=> {
            setOutput([...output,res.data])
       })
       .catch(err=> console.log(err))
    } 
    //!
    return [values, clearForm,change,submit]
}











export const useForm1 = (key,initialValue,callbackFunction) => {
    const [values,setValues] = useLocalStorage(key,initialValue); //*custom hooks are the equivalent to components for this, it's like everything is component based

    const clearForm = (e) => {
        if (e) e.preventDefault();
        setValues(initialValue); 
    }

    const change = (e) => {
        localStorage.setItem([e.target.name], e.target.value)
       setValues({...values,
    [e.target.name] : e.target.value})
    };

    //!import info, this is nice because then it utilizes a relative function for what specifically that form info needs 
    const submit = e => {
       e.preventDefault();
       callbackFunction();
    } 
    //!
    return [values, clearForm,change,submit];
}