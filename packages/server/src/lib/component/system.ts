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

  public override start(): System {
    const updatedDeps = update({
      action: (dep: Lifecycle) => dep.start(),
      lifecycle: this,
    });

    return new System(updatedDeps);
  }

  public override stop(): System {
    const updatedDeps = reverseUpdate({
      action: (dep: Lifecycle) => dep.stop(),
      lifecycle: this,
    });

    return new System(updatedDeps);
  }
}

export function createSystem(deps: ContructorParams<Lifecycle>) {
  return new System(deps);
}
