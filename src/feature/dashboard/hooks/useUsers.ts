import { useMemo } from 'react';
import { User } from '../types';

interface UseUsersProps {
  users: User[];
  searchTerm: string;
}

export const useUsers = ({ users, searchTerm }: UseUsersProps) => {
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);
  
  return { filteredUsers };
};