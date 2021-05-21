import { useEffect, DependencyList } from "react";

export const useEffectAsync = (effect: () => any, deps?: DependencyList) => {
  useEffect(() => {
    effect();
  }, deps);
};
