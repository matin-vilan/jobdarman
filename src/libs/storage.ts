"use client";
type SetLocalStorageType = {
  name: string;
  value: string;
};

export function setLocalStorage({ name, value }: SetLocalStorageType) {
  return typeof window !== "undefined" && localStorage.setItem(name, value);
}

export function getLocalStorage(name: string) {
  return typeof window !== "undefined" && localStorage.getItem(name);
}

export function removeLocalStorage(name: string) {
  return typeof window !== "undefined" && localStorage.removeItem(name);
}
