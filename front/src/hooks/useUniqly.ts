import { useState, useEffect } from "react"

export const useUniqly = <T extends object>(data: T[], address: keyof T) => {
  const [uniq, setUniqSet] = useState<Set<unknown>>(()=>{
    const set: Set<unknown> = new Set();
    data?.forEach((element) => set.add(element[address]));
    return set;
  });

  useEffect(() => {
      const set: Set<unknown> = new Set();
      data?.forEach((element) => set.add(element[address]));
      setUniqSet(set);
  }, [data]);

  return uniq;
}