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

  abstract start(): Promise<Lifecycle>;
  abstract stop(): Promise<Lifecycle>;

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

export async function update(
  params: UpdateFnParams<Lifecycle>,
): Promise<ComponentMap<Lifecycle>> {
  const deps = Array.from(params.lifecycle.deps);

  return await actionRunner({
    action: params.action,
    iterable: deps,
  });
}

export async function reverseUpdate(
  params: UpdateFnParams<Lifecycle>,
): Promise<ComponentMap<Lifecycle>> {
  const reversedDeps = Array.from(params.lifecycle.deps).reverse();

  const deps = await actionRunner({
    action: params.action,
    iterable: reversedDeps,
  });

  return new Map(Array.from(deps).reverse());
}

async function actionRunner(
  params: ActionRunnerFnParams<Lifecycle>,
): Promise<ComponentMap<Lifecycle>> {
  const deps = new Map();

  for await (const [key, entry] of params.iterable) {
    deps.set(key, await params.action(entry));
  }

  return deps;
}
