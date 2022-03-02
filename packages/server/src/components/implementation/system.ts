import { ComponenMapRecord } from "./contracts";

import { Lifecycle, reverseUpdate, update } from "./component";
import { componentMapFromValue } from "./helpers";
import { RequiredDependencies } from "./errors";

export class System extends Lifecycle {
  public constructor(
    deps: ComponenMapRecord<Lifecycle>,
  ) {
    const _deps = componentMapFromValue(deps);

    if (_deps.size === 0) {
      throw new RequiredDependencies();
    }

    super(_deps);
  }

  public override start(): System {
    return new System(update(this, (dep) => dep.start()));
  }

  public override stop(): System {
    return new System(reverseUpdate(this, (dep) => dep.stop()));
  }
}

export function createSystem(deps: ComponenMapRecord<Lifecycle>) {
  return new System(deps);
}
