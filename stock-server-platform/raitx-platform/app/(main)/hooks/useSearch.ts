'use client';

import { useState, useCallback } from 'react';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  }, []);

  return {
    searchQuery,
    updateSearch,
    isSearching,
  };
}

