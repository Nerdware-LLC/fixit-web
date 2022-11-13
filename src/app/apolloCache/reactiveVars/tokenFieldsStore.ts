import { ReactiveStore } from "./ReactiveStore";
import type { AuthTokenPayload } from "../../../types";

export const tokenFieldsStore = new ReactiveStore<AuthTokenPayload | undefined>();
