"use client";

import { useSyncExternalStore } from "react";

let passcode: string | null = null;
const listeners = new Set<() => void>();

function set(value: string | null) {
  passcode = value;
  listeners.forEach((listener) => listener());
}

export const signInApprover = (value: string) => set(value);
export const signOutApprover = () => set(null);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * `undefined` while rendering on the server (unknown), `null` when signed out,
 * otherwise the passcode to send with approver requests.
 */
export function useApproverPasscode(): string | null | undefined {
  return useSyncExternalStore(
    subscribe,
    () => passcode,
    () => undefined,
  );
}
