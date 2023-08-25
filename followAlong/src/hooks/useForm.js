import React, {useState} from "react";
import axios from "axios"; 

export const useForm = (initialValue,output,setOutput) => {
    const [values,setValues] = useState(initialValue); //*custom hooks are the equivalent to components for this, it's like everything is component based

    const clearForm = (e) => {
        if (e) e.preventDefault();
        setValues(initialValue); 
    }

    const change = (e) => {
       setValues({...values,
    [e.target.name] : e.target.value})
    };

    const submit = e => {
       e.preventDefault();
       const newData  = Object.assign({},values);
       axios.post( "https://reqres.in/api/users",newData) 
       .then(res=> {
            setOutput([...output,res.data])
       })
       .catch(err=> console.log(err))
    }
    return [values, clearForm,change,submit]
}