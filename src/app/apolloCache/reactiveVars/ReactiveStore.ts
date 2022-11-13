import { makeVar, type ReactiveVar } from "@apollo/client/cache";
import { useReactiveVar } from "@apollo/client/react/hooks";

// TODO maybe a variant of ReactiveStore which integrates with an AsyncStorage token?

export class ReactiveStore<T> {
  private reactiveVar: ReactiveVar<T>;

  constructor(initialStoreValue?: any) {
    this.reactiveVar = makeVar(initialStoreValue);
  }

  get = () => this.reactiveVar();

  set = (newValue: any) => this.reactiveVar(newValue);

  useSubToStore = () => useReactiveVar(this.reactiveVar);
}
