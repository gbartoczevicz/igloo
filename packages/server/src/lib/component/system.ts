import { ContructorParams } from "./contracts";
import { Lifecycle, reverseUpdate, update } from "./component";
import { InvalidDependencies } from "./errors";

export class System extends Lifecycle {
  public constructor(deps: ContructorParams<Lifecycle>) {
    const depsMapped = Lifecycle.dependenciesToMap(deps);

    if (depsMapped.size === 0) {
      throw new InvalidDependencies();
    }

    super(deps);
  }

  public override async start(): Promise<System> {
    const updatedDeps = await update({
      action: async (dep: Lifecycle) => dep.start(),
      lifecycle: this,
    });

    return new System(updatedDeps);
  }

  public override async stop(): Promise<System> {
    const updatedDeps = await reverseUpdate({
      action: async (dep: Lifecycle) => dep.stop(),
      lifecycle: this,
    });

    return new System(updatedDeps);
  }
}

export function createSystem(deps: ContructorParams<Lifecycle>) {
  return new System(deps);
}
