import React from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import "./Form.scss";

const formSchema = Yup.object().shape({
  name: Yup.string().required("please enter your name"),
  email: Yup.string()
    .email("please enter a valid email address")
    .required("an email address is required"),
  password: Yup.string().min(
    5,
    "password must be at least five characters long"
  ),
  terms: Yup.boolean().oneOf([true], "you must agree to the terms of service"),
});

const Form = (props) => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("submit");
    axios.post("https://reqres.in/api/users", data).then((r) => {
      reset({});
      props.addMember(r.data);
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>New User Information</h3>
      <label htmlFor="name">name:</label>
      <input type="text" id="name" name="name" ref={register} />
      <p className="errors">{errors.name?.message}</p>

      <label htmlFor="email">email:</label>
      <input type="email" id="email" name="email" ref={register} />
      <p className="errors">{errors.email?.message}</p>

      <label htmlFor="password">password:</label>
      <input type="password" id="password" name="password" ref={register} />
      <p className="errors">{errors.password?.message}</p>

      <label htmlFor="terms">
        <input type="checkbox" id="terms" name="terms" ref={register} />I agree
        to the terms of service
      </label>
      <p className="errors">{errors.terms?.message}</p>

      <button type="submit">submit</button>
    </form>
  );
};
export default Form;
