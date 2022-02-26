import {
  ComponenMapRecord,
  ComponentAction,
  ComponentIterable,
  ComponentMap,
} from "./contracts";

import { componentMapFromValue } from "./helpers";
import { LifecycleNotFound } from "./errors";

export abstract class Lifecycle {
  public readonly deps: ComponentMap<Lifecycle>;

  protected constructor(
    deps?: ComponenMapRecord<Lifecycle>,
  ) {
    this.deps = componentMapFromValue(deps);
  }

  abstract start(): Lifecycle;
  abstract stop(): Lifecycle;
}

export function getDependency(
  lifecycle: Lifecycle,
  key: string,
): Lifecycle {
  const dependencyFound = lifecycle.deps.get(key);

  if (dependencyFound === undefined) {
    throw new LifecycleNotFound(key);
  }

  return dependencyFound;
}

export function update(
  lifecycle: Lifecycle,
  action: ComponentAction<Lifecycle>,
): ComponentMap<Lifecycle> {
  return actionRunner(Array.from(lifecycle.deps), action);
}

export function reverseUpdate(
  lifecycle: Lifecycle,
  action: ComponentAction<Lifecycle>,
): ComponentMap<Lifecycle> {
  const reversedDeps = Array.from(lifecycle.deps).reverse();
  const deps = actionRunner(reversedDeps, action);

  return new Map(Array.from(deps).reverse());
}

function actionRunner(
  iterable: ComponentIterable<Lifecycle>,
  action: ComponentAction<Lifecycle>,
): ComponentMap<Lifecycle> {
  const deps = new Map();

  for (const [key, entry] of iterable) {
    deps.set(key, action(entry));
  }

  return deps;
}
