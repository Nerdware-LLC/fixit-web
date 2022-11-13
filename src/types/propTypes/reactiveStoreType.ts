import { instanceOf } from "prop-types";
import { ReactiveStore } from "../../app/apolloCache/reactiveVars/ReactiveStore";
import { ListSettingsStore } from "../../app/apolloCache/reactiveVars/ListSettingsStore";

export const reactiveStoreType = instanceOf(ReactiveStore);
export const listSettingsStoreType = instanceOf(ListSettingsStore);
