import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { object as yupObject, string } from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { Form } from "@components/Form";
import { PasswordInput } from "@components/Form/PasswordInput";
import { PhoneInput } from "@components/Form/PhoneInput";
import { TextInput } from "@components/Form/TextInput";
import { useAuthService } from "@hooks/useAuthService";
import type { RegisterNewUserParams } from "@services/authService";

const toastWelcomeMsg = (additionalInfo?: string) => {
  toast.success(`Welcome to Fixit${additionalInfo ? ` - ${additionalInfo}` : "!"}`, {
    toastId: "registerNewUser-success",
  });
};

export const RegisterForm = () => {
  const { registerNewUser } = useAuthService();
  const { state: locationState } = useLocation();
  const nav = useNavigate();

  const handleSubmit = async (values: RegisterNewUserParams) => {
    // Add "@" prefix to "handle"
    const { success } = await registerNewUser({ ...values, handle: `@${values.handle}` });

    if (success) {
      /* If the user registered AFTER selecting a subscription from the /products page,
      locationState will contain their selectedSub in locationState.sub, which needs to
      be provided to the checkout page. If that property does not yet exist, nav to the
      products page so they can make their selection.  */

      if (!!locationState && Object.prototype.hasOwnProperty.call(locationState, "sub")) {
        toastWelcomeMsg();

        nav("/checkout", { state: locationState });
      } else {
        toastWelcomeMsg("please select a subscription to get started");

        nav("/products", {
          state: {
            isRedirect: true,
            redirectedFrom: "/register", // <-- ensures "select a sub" msg isn't shown twice
          },
        });
      }
    }
  };

  return (
    <Form
      initialValues={REGISTER_FORM.INITIAL_VALUES}
      validationSchema={REGISTER_FORM.SCHEMA}
      onSubmit={handleSubmit}
      sx={{ all: "inherit" }}
    >
      <TextInput
        id="handle"
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />
      <PhoneInput id="phone" />
      <TextInput id="email" type="email" autoComplete="email" />
      <PasswordInput id="password" autoComplete="new-password" />
      <Form.SubmitButton />
    </Form>
  );
};

const REGISTER_FORM = {
  INITIAL_VALUES: {
    handle: "",
    phone: "",
    email: "",
    password: "",
    googleAccessToken: "",
    googleID: "",
    profile: {
      givenName: "",
      familyName: "",
      businessName: "",
      photoUrl: "",
    },
  },
  SCHEMA: yupObject().shape(
    {
      handle: string()
        .matches(
          /^[a-z0-9_]{3,50}$/i,
          "Must be between 3-50 characters, and only contain letters, numbers, and underscores"
        )
        .required("Please choose a handle (this is how other users will identify you)"),
      phone: string()
        .matches(/^\(\d{3}\) \d{3}-\d{4}$/, "Must be a valid US phone number")
        .required("Please provide a phone number"),
      email: string()
        .email("Invalid email")
        .max(50, "Email must be fewer than 50 characters")
        .required("Please provide an email"),
      password: string().when(["googleID", "googleAccessToken"], {
        is: (googleID?: string, googleAccessToken?: string) => !googleID && !googleAccessToken,
        then: () =>
          string()
            .min(6, "Must be at least 6 characters long")
            .max(45, "Must be fewer than 45 characters long")
            .required("Please enter a password"),
        otherwise: () => string(),
      }),
      googleAccessToken: string().when("password", {
        is: "",
        then: () => string().required(),
        otherwise: () => string(),
      }),
      googleID: string().when("password", {
        is: "",
        then: () => string().required(),
        otherwise: () => string(),
      }),
      profile: yupObject({
        givenName: string().max(50).notRequired(),
        familyName: string().max(50).notRequired(),
        businessName: string().max(50).notRequired(),
        photoUrl: string().url().max(255).notRequired(),
      }).defined(),
    },
    [
      ["password", "googleID"],
      ["password", "googleAccessToken"],
    ]
  ),
};
