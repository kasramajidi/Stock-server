"use client";

import { useState, useCallback } from "react";
import { Address } from "./types";

const STORAGE_KEY = "userAddresses";

function loadAddressesFromStorage(): Address[] {
  if (typeof window === "undefined") return [];

  try {
    const savedAddresses = localStorage.getItem(STORAGE_KEY);
    if (savedAddresses) {
      const parsed = JSON.parse(savedAddresses);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to load addresses:", error);
  }
  return [];
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(
    loadAddressesFromStorage
  );

  const saveAddresses = useCallback((newAddresses: Address[]) => {
    setAddresses(newAddresses);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
      } catch (error) {
        console.error("Failed to save addresses:", error);
      }
    }
  }, []);

  const addAddress = useCallback(
    (address: Address) => {
      saveAddresses([...addresses, address]);
    },
    [addresses, saveAddresses]
  );

  const updateAddress = useCallback(
    (id: string, updates: Partial<Address>) => {
      const newAddresses = addresses.map((addr) =>
        addr.id === id ? { ...addr, ...updates } : addr
      );
      saveAddresses(newAddresses);
    },
    [addresses, saveAddresses]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      const newAddresses = addresses.filter((addr) => addr.id !== id);
      saveAddresses(newAddresses);
    },
    [addresses, saveAddresses]
  );

  return {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}
