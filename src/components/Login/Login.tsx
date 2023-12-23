import { Component, useState } from "react";
// import { RouteComponentProps } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Title from "antd/es/typography/Title";

// import AuthService from "../services/auth.service";

// interface RouterProps {
//   history: string;
// }

// type Props = RouteComponentProps<RouterProps>;

// type State = {
//   username: string;
//   password: string;
//   loading: boolean;
//   message: string;
// };

// function validationSchema() {
//   return Yup.object().shape({
//     username: Yup.string().required("This field is required!"),
//     password: Yup.string().required("This field is required!"),
//   });
// }

// function validateEmail(value: string) {
//   let error;
//   if (!value) {
//     error = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//     error = "Invalid email address";
//   }
//   return error;
// }
// function validatePassword(value: string) {
//   let error;
//   if (!value) {
//     error = "Required";
//   }
//   return error;
// }

// else if (value.length < 8) {
//   error = "Invalid password";
// }

// function validateUsername(value: string) {
//   let error;
//   if (value === "admin") {
//     error = "Nice try!";
//   }
//   return error;
// }

const Login: React.FC<{}> = () => {
  //   const [userName, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [message, setMessage] = useState("");
  // }

  //

  // function handleLogin(formValue: { username: string; password: string }) {
  // const { username, password } = formValue;

  // setMessage("");
  // setLoading(true);

  // setTimeout(() => {this.setState(loading: true)}, 1000)

  // AuthService.login(username, password).then(
  //   () => {
  //     this.props.history.push("/profile");
  //     window.location.reload();
  //   },
  //   error => {
  //     const resMessage =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString();

  //     this.setState({
  //       loading: false,
  //       message: resMessage
  //     });
  //   }
  // );
  // }
  // const { loading, message } = this.state;

  interface MyFormValues {
    email: string;
    password: string;
  }

  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  return (
    <div>
      <Title level={2}>Вход</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log("onSubmit", values);
        }}
      >
        {({ errors, touched, validateField, validateForm }) => (
          <Form>
            <Field
              name="email"
              // type="email"
              // validate={validateEmail}
              placeholder="email"
            />
            {errors.email && touched.email && <div>{errors.email}</div>}
            <p></p>

            <Field
              name="password"
              type="password"
              // validate={validatePassword}
              placeholder="password"
            />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}
            <p></p>
            {/** Trigger field-level validation
            imperatively */}
            {/* <button type="button" onClick={() => validateField("username")}>
              Check Username
            </button> */}
            {/** Trigger form-level validation
            imperatively */}
            {/* <button
              type="button"
              onClick={() => validateForm().then(() => console.log("blah"))}
            >
              Validate All
            </button> */}
            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
