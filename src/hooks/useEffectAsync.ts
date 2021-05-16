import { useEffect, DependencyList } from "react";

export const useEffectAsync = (effect: () => any, deps?: DependencyList) => {
  console.log("useEffectAsync");
  useEffect(() => {
    effect();
  }, deps);
};
