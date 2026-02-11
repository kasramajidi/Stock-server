"use client";

import { useState } from "react";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  username: string;
  email: string;
}

export function useRegister(
  onSuccess?: (data: RegisterResponse, variables: RegisterData) => void,
  onError?: (error: unknown) => void
) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with actual API later
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Mock successful response
      const result: RegisterResponse = {
        id: `user_${Date.now()}`,
        username: data.username,
        email: data.email,
      };
      
      onSuccess?.(result, data);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    isLoading,
  };
}

