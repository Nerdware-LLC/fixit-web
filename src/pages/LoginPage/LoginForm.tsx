import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object as yupObject, string } from "yup";
import { Form } from "@components/Form";
import { PasswordInput } from "@components/Form/PasswordInput";
import { TextInput } from "@components/Form/TextInput";
import { useAuthService } from "@hooks/useAuthService";
import type { LoginParams } from "@services/authService";

export const LoginForm = () => {
  const { login } = useAuthService();
  const nav = useNavigate();

  const onSubmit = async (credentials: LoginParams) => {
    const { success } = await login(credentials);
    if (success) {
      toast.success("Welcome back!", {
        toastId: "login-success",
        pauseOnHover: false,
      });
      nav("/home");
    }
  };

  return (
    <Form
      initialValues={LOGIN_FORM.INITIAL_VALUES}
      validationSchema={LOGIN_FORM.SCHEMA}
      onSubmit={onSubmit}
      sx={{ all: "inherit" }}
    >
      <TextInput id="email" type="email" autoComplete="email" />
      <PasswordInput id="password" autoComplete="current-password" />
      <Form.SubmitButton />
    </Form>
  );
};

const LOGIN_FORM = {
  INITIAL_VALUES: {
    email: "",
    password: "",
  },
  SCHEMA: yupObject().shape({
    email: string().email("Invalid email").max(50).required("Required"),
    password: string()
      .min(6, "Must be at least 6 characters long.")
      .max(45, "Must be less than 45 characters long.")
      .required("Required"),
  }),
};
