import {
  ActionRunnerFnParams,
  ComponentMap,
  ContructorParams,
  UpdateFnParams,
} from "./contracts";
import { InvalidDependencies } from "./errors";

export abstract class Lifecycle {
  public readonly deps: ComponentMap<Lifecycle>;

  protected constructor(deps?: ContructorParams<Lifecycle>) {
    this.deps = Lifecycle.dependenciesToMap(deps);
  }

  abstract start(): Lifecycle;
  abstract stop(): Lifecycle;

  protected static dependenciesToMap(deps?: ContructorParams<Lifecycle>) {
    if (!deps) {
      return new Map();
    }

    if (deps instanceof Map) {
      return deps;
    }

    if (deps instanceof Object) {
      return new Map(Object.entries(deps));
    }

    throw new InvalidDependencies();
  }
}

export function update(
  params: UpdateFnParams<Lifecycle>,
): ComponentMap<Lifecycle> {
  const deps = Array.from(params.lifecycle.deps);

  return actionRunner({
    action: params.action,
    iterable: deps,
  });
}

export function reverseUpdate(
  params: UpdateFnParams<Lifecycle>,
): ComponentMap<Lifecycle> {
  const reversedDeps = Array.from(params.lifecycle.deps).reverse();

  const deps = actionRunner({
    action: params.action,
    iterable: reversedDeps,
  });

  return new Map(Array.from(deps).reverse());
}

function actionRunner(
  params: ActionRunnerFnParams<Lifecycle>,
): ComponentMap<Lifecycle> {
  const deps = new Map();

  for (const [key, entry] of params.iterable) {
    deps.set(key, params.action(entry));
  }

  return deps;
}
