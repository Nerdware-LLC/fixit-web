import * as Yup from "yup";

const YUP_ERR_MSGS = {
  MIN_3: "Must be at least 3 characters long",
  MAX_250: "Must be fewer than 251 characters"
};

export const yupCommonSchema = {
  string: {
    max250: Yup.string().max(250, YUP_ERR_MSGS.MAX_250),
    min3Max250: Yup.string().min(3, YUP_ERR_MSGS.MIN_3).max(250, YUP_ERR_MSGS.MAX_250)
  }
};
