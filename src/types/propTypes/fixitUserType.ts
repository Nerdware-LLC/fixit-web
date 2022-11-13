import { oneOfType } from "prop-types";
import { publicUserType } from "./userType";
import { contactType } from "./contactType";

export const fixitUserType = oneOfType([publicUserType, contactType]);
