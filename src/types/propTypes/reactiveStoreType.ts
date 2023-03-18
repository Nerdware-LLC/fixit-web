import { instanceOf } from "prop-types";
import { ReactiveStore } from "@cache/reactiveVars/ReactiveStore";

export const reactiveStoreType = instanceOf(ReactiveStore);
