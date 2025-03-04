import { useState, useCallback, ChangeEvent } from 'react';

export const useSearch = (initialTerm = '') => {
  const [searchTerm, setSearchTerm] = useState<string>(initialTerm);
  
  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  const resetSearch = useCallback(() => {
    setSearchTerm('');
  }, []);
  
  return { 
    searchTerm, 
    setSearchTerm, 
    handleSearchChange, 
    resetSearch 
  };
};