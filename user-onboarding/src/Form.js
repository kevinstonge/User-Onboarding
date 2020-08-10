import React, { useState } from "react";
import * as Yup from "yup";
import "./Form.scss";

const Form = (props) => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required(),
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
  const [errors, setErrors] = useState(
    Object.assign(
      {},
      ...Object.keys(formSchema.fields).map((k) => {
        return { [k]: "" };
      })
    )
  );
  console.log(errors);
  return (
    <form>
      {Object.keys(formSchema.fields).map((k) => (
        <div className="formSection" key={`${k}-formSection`}>
          <div className="formRow">
            <label htmlFor={k}>{k}</label>
            {formSchema.fields[k].type === "string" && k !== "password" ? (
              <input type="text" id={k}></input>
            ) : null}
            {k === "password" ? <input type="password" id={k}></input> : null}
            {formSchema.fields[k].type === "boolean" ? (
              <input type="checkbox" id={k}></input>
            ) : null}
          </div>
          <p className="formError" id={`${k}-error`}>
            error text
          </p>
        </div>
      ))}
    </form>
  );
};
export default Form;
