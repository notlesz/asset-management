/* eslint-disable @typescript-eslint/no-explicit-any */

export const getLocaStorageItem = (key: string) => localStorage.getItem(key)

export const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, value)
}
