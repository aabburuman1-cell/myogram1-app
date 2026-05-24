import { useState } from 'react';
import { searchUsers, followUser, unfollowUser, getFollowers } from '../services/usersService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchUsers = async (searchTerm) => {
    if (!searchTerm) {
      setUsers([]);
      return;
    }
    try {
      setLoading(true);
      const data = await searchUsers(searchTerm);
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUser = async (currentUserId, userIdToFollow) => {
    try {
      await followUser(currentUserId, userIdToFollow);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnfollowUser = async (currentUserId, userIdToUnfollow) => {
    try {
      await unfollowUser(currentUserId, userIdToUnfollow);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetFollowers = async (userId) => {
    try {
      setLoading(true);
      const data = await getFollowers(userId);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    handleSearchUsers,
    handleFollowUser,
    handleUnfollowUser,
    handleGetFollowers,
  };
};
