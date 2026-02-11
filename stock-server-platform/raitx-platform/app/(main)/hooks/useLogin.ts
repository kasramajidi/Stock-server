"use client";

import { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  username?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export function useLogin(
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: unknown) => void
) {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (data: LoginData) => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with actual API later
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Try to get existing user from localStorage
      let existingUser = null;
      if (typeof window !== "undefined") {
        try {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            existingUser = JSON.parse(storedUser);
          }
        } catch {}
      }
      
      // Mock successful response
      const result: LoginResponse = {
        user: {
          id: existingUser?.id || `user_${Date.now()}`,
          email: data.email,
          username: existingUser?.username || data.email.split("@")[0], // Extract username from email
        },
        token: existingUser?.token || `mock_token_${Date.now()}`,
      };
      
      // Update localStorage with complete user data
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
      }
      
      onSuccess?.(result);
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

