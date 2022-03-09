import { ComponenMapRecord, ComponentMap } from "./contracts";

import { InvalidDependencies } from "./errors";

export function componentMapFromValue<T>(
  val?: ComponenMapRecord<T>,
): ComponentMap<T> {
  if (!val) {
    return new Map();
  }

  if (val instanceof Map) {
    return val;
  }

  if (val instanceof Object) {
    return new Map(Object.entries(val));
  }

  throw new InvalidDependencies();
}
