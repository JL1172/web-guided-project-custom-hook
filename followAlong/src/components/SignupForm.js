import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useForm } from "../hooks/useForm";
import Button from "../theme/Button";

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
const initialValue = { username: "", email: ""}
export default function SignupForm() {
  const classes = useStyles();
  const [output, setOutput] = useState([]);
  const [formData, clearForm, change, submit] = useForm("sign-in",initialValue, output, setOutput);
  
  return (
    <div p={2} className="form">
      <form onSubmit={submit}>
        <fieldset>
          <legend>Add New Client</legend>
          <TextField
            id="outlined-name"
            label="User Name"
            className={classes.textField}
            name="username"
            value={formData.username}
            onChange={change}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            name="email"
            value={formData.email}
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
      {output.length > 0 && output.map(n => {
       return <p key = {n.id}>{n.email} {n.username}</p>
      })}
      {localStorage.username}
    </div>
  );
}