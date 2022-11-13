import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthService } from "../../hooks";
import { Form, TextInput } from "../../components";

export const LoginForm = () => {
  const { login } = useAuthService();
  const nav = useNavigate();

  const onSubmit = async (credentials: Parameters<typeof login>[0]) => {
    const { success } = await login(credentials);
    if (!!success) nav("/home");
  };

  return (
    <Form
      initialValues={LOGIN_FORM.INITIAL_VALUES}
      validationSchema={LOGIN_FORM.SCHEMA}
      onSubmit={onSubmit}
      submitButton
    >
      <TextInput id={"email"} />
      <TextInput id={"password"} />
    </Form>
  );
};

const LOGIN_FORM = {
  INITIAL_VALUES: {
    email: "",
    password: ""
  },
  SCHEMA: Yup.object().shape({
    email: Yup.string().email("Invalid email").max(50).required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters long.")
      .max(45, "Must be less than 45 characters long.")
      .required("Required")
  })
};
