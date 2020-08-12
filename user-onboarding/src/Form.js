import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import "./Form.scss";

const Form = (props) => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("please enter your name"),
    email: Yup.string()
      .email("please enter a valid email address")
      .required("an email address is required"),
    password: Yup.string().min(
      5,
      "password must be at least five characters long"
    ),
    "I agree to the terms of service": Yup.boolean().oneOf(
      [true],
      "you must agree to the terms of service"
    ),
  });
  const empty = Object.assign(
    {},
    ...Object.keys(formSchema.fields).map((k) => {
      return { [k]: "" };
    })
  );
  const [errors, setErrors] = useState(empty);
  const [values, setValues] = useState(empty);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    formSchema.isValid(values).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [values, formSchema]);
  const validateInput = (schema, id, value) => {
    Yup.reach(schema, id)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [id]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [id]: err.errors[0] });
      });
  };
  const handleInput = (e) => {
    let { id, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setValues({ ...values, [id]: value });
    validateInput(formSchema, id, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    axios.post("https://reqres.in/api/users", values).then((r) => {
      props.addMember(r.data);
      setValues(empty);
    });
  };
  return (
    <form>
      <h3>New User Information</h3>
      {Object.keys(formSchema.fields).map((k) => {
        let inputType = "text";
        if (k === "password") {
          inputType = "password";
        }
        if (formSchema.fields[k].type === "boolean") {
          inputType = "checkbox";
        }

        return (
          <div className="formSection" key={`${k}-formSection`}>
            <div className="formRow">
              <label htmlFor={k}>{k}</label>
              <input
                type={inputType}
                id={k}
                value={values[k]}
                checked={values[k]}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <p className="formError" id={`${k}-error`}>
              {errors[k]}
            </p>
          </div>
        );
      })}
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        disabled={buttonDisabled}
      >
        submit
      </button>
    </form>
  );
};
export default Form;
