import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, TextInput, PasswordInput } from "@components";
import { useAuthService } from "@hooks";

export const RegisterForm = () => {
  const { registerNewUser } = useAuthService();
  const { state: locationState } = useLocation();
  const nav = useNavigate();

  const handleSubmit = async (values: Parameters<typeof registerNewUser>[0]) => {
    const { success } = await registerNewUser(values);

    if (success) {
      /* If the user registered AFTER selecting a subscription from the /products page,
      locationState will contain their selectedSub in locationState.sub, which needs to
      be provided to the checkout page. If that property does not yet exist, nav to the
      products page so they can make their selection.  */

      if (!!locationState && Object.prototype.hasOwnProperty.call(locationState, "sub")) {
        nav("/checkout", { state: locationState });
      } else {
        nav("/products", { state: { isRedirect: true } });
      }
    }
  };

  return (
    <Form
      initialValues={REGISTER_FORM.INITIAL_VALUES}
      validationSchema={REGISTER_FORM.SCHEMA}
      onSubmit={handleSubmit}
    >
      <TextInput id="phone" />
      <TextInput id="email" />
      <PasswordInput id="password" />
      <Form.SubmitButton />
    </Form>
  );
};

const REGISTER_FORM = {
  INITIAL_VALUES: {
    phone: "",
    email: "",
    password: "",
    googleAccessToken: "",
    googleID: "",
    profile: {
      givenName: "",
      familyName: "",
      businessName: "",
      photoUrl: ""
    }
  },
  SCHEMA: Yup.object().shape(
    {
      phone: Yup.string()
        .matches(/^\d{10}$/, "Must be a valid phone number.")
        .required(
          "Please provide a phone number (this will help your contacts connect with you on Fixit)"
        ),
      email: Yup.string()
        .email("Invalid email")
        .max(50, "Email must be fewer than 50 characters.")
        .required("Please provide an email"),
      password: Yup.string().when(["googleID", "googleAccessToken"], {
        is: (googleID?: string, googleAccessToken?: string) => !googleID && !googleAccessToken,
        then: Yup.string()
          .min(6, "Must be at least 6 characters long")
          .max(45, "Must be fewer than 45 characters long")
          .required("Please enter a password"),
        otherwise: Yup.string()
      }),
      googleAccessToken: Yup.string().when("password", {
        is: "",
        then: Yup.string().required(),
        otherwise: Yup.string()
      }),
      googleID: Yup.string().when("password", {
        is: "",
        then: Yup.string().required(),
        otherwise: Yup.string()
      }),
      profile: Yup.object({
        givenName: Yup.string().max(50).notRequired(),
        familyName: Yup.string().max(50).notRequired(),
        businessName: Yup.string().max(50).notRequired(),
        photoUrl: Yup.string().url().max(255).notRequired()
      }).defined()
    },
    [
      ["password", "googleID"],
      ["password", "googleAccessToken"]
    ]
  )
};
