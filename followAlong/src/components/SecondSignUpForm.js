import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useForm1 } from "../hooks/useForm";
import Button from "../theme/Button";
import axios from 'axios'; 

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));
const initialValue = { username1: "", email1:  ""}
export default function SecondSignUpForm() {
  const classes = useStyles();
  const [output, setOutput] = useState(null);
  const callbackFunction = () => {
    axios.get( "https://reqres.in/api/users")
    .then(res=> {
        const message = "stole your info, get hacked";
        const newObj = Object.assign([],res.data.data);
        const inputObj = newObj.map((n,i)=> {
            if (i === 0) {
                delete n.email;
                delete n.first_name;
                return { message, id : Date.now()}
            } return n; 
        })
        //!could've done newObj.splice(0,1,replace with message)
        setOutput(inputObj)
    })
    .catch(err=> console.log(err))
  }
  const [formData, clearForm, change,submit] = useForm1("second-sign-in",initialValue,callbackFunction);

  return (
    <div p={2} className="form">
      <form onSubmit={submit}>
        <fieldset>
          <legend>Add New Client</legend>
          <TextField
            id="outlined-name"
            label="User Name"
            className={classes.textField}
            name="username1"
            value={formData.username1}
            onChange={change}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            name="email1"
            value={formData.email1}
            onChange={change}
            margin="normal"
            variant="outlined"
          />
          <div className="flexer">
            <Button color="red" onClick={clearForm}>
              Clear
            </Button>
            <Button color="blue" type="submit">
              Submit
            </Button>
          </div>
        </fieldset>
      </form>
      {output && output[0].message }
      {output && output.map(n => {
       return <p key = {n.id}>{n.email} {n.first_name}</p>
      })}
    </div>
  );
}