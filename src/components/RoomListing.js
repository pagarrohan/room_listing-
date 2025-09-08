import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, Loader2, AlertCircle, Eye, Bed, Users } from 'lucide-react';
import { generateMockRooms } from '../utils/mockData';
import SkeletonLoader from './SkeletonLoader';
import LazyImage from './LazyImage';
import LazyVideo from './LazyVideo';
import RoomVariant from './RoomVariant';

// Individual room component
const RoomItem = React.memo(({ room, onToggleExpand }) => {
  const visibleVariants = room.expanded ? room.variants : room.variants.slice(0, 2);
  const hasMoreVariants = room.variants.length > 2;

  return (
    <div className="mb-8 bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{room.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleVariants.map((variant) => (
          <RoomVariant key={variant.id} variant={variant} />
        ))}
      </div>
      
      {hasMoreVariants && (
        <div className="text-center mt-4">
          <button
            onClick={() => onToggleExpand(room.id)}
            className="flex items-center justify-center mx-auto px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {room.expanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show More ({room.variants.length - 2} more variants)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
});

// Main room listing component
const RoomListing = () => {
  const [rooms, setRooms] = useState([]);
  const [displayedRooms, setDisplayedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const loaderRef = useRef(null);
  const ITEMS_PER_PAGE = 10;

  // Initialize data
  useEffect(() => {
    const mockRooms = generateMockRooms(100);
    setRooms(mockRooms);
    setDisplayedRooms(mockRooms.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  }, []);

  // Load more data with debouncing
  const loadMoreRooms = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const startIndex = page * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newRooms = rooms.slice(startIndex, endIndex);

      if (newRooms.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedRooms(prev => [...prev, ...newRooms]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load more rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, rooms]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreRooms();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreRooms, hasMore, loading]);

  const toggleRoomExpansion = useCallback((roomId) => {
    setDisplayedRooms(prev => 
      prev.map(room => 
        room.id === roomId 
          ? { ...room, expanded: !room.expanded }
          : room
      )
    );
  }, []);

  const memoizedRooms = useMemo(() => 
    displayedRooms.map(room => (
      <RoomItem 
        key={room.id} 
        room={room} 
        onToggleExpand={toggleRoomExpansion}
      />
    )), 
    [displayedRooms, toggleRoomExpansion]
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Available Rooms
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {memoizedRooms}
        </div>

        {/* Loading indicator */}
        <div ref={loaderRef} className="text-center py-8">
          {loading && (
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span className="text-gray-600">Loading more rooms...</span>
            </div>
          )}
          {!hasMore && displayedRooms.length > 0 && (
            <p className="text-gray-500">No more rooms to load</p>
          )}
        </div>

        {/* Initial loading skeleton */}
        {displayedRooms.length === 0 && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomListing;