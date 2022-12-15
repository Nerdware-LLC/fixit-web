import { instanceOf } from "prop-types";
import { ReactiveStore } from "@cache/reactiveVars/ReactiveStore";
import { ListSettingsStore } from "@cache/reactiveVars/ListSettingsStore";

export const reactiveStoreType = instanceOf(ReactiveStore);
export const listSettingsStoreType = instanceOf(ListSettingsStore);
