import { useState, useEffect } from 'react';
import {
  getReels,
  uploadReel,
  likeReel,
  unlikeReel,
  addComment,
  incrementViews,
} from '../services/reelsService';

export const useReels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const data = await getReels();
      setReels(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadReel = async (userId, videoUri, description, thumbnail) => {
    try {
      setLoading(true);
      await uploadReel(userId, videoUri, description, thumbnail);
      await fetchReels();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeReel = async (reelId, userId) => {
    try {
      await likeReel(reelId, userId);
      await fetchReels();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnlikeReel = async (reelId, userId) => {
    try {
      await unlikeReel(reelId, userId);
      await fetchReels();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddComment = async (reelId, userId, text, userAvatar, userName) => {
    try {
      await addComment(reelId, userId, text, userAvatar, userName);
      await fetchReels();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleIncrementViews = async (reelId) => {
    try {
      await incrementViews(reelId);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return {
    reels,
    loading,
    error,
    fetchReels,
    handleUploadReel,
    handleLikeReel,
    handleUnlikeReel,
    handleAddComment,
    handleIncrementViews,
  };
};
