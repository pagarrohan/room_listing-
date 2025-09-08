import React from 'react';
import { Eye, Bed, Users } from 'lucide-react';
import LazyImage from './LazyImage';
import LazyVideo from './LazyVideo';

// Individual room variant component
const RoomVariant = React.memo(({ variant }) => {
  const hasMedia = variant.video_url || (variant.room_images && variant.room_images.length > 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-transform hover:scale-[1.02]">
      {hasMedia && (
        <div className="h-48 relative">
          {variant.video_url ? (
            <LazyVideo src={variant.video_url} className="h-48" />
          ) : variant.room_images?.length > 0 ? (
            <LazyImage 
              src={variant.room_images[0]} 
              alt={variant.name}
              className="h-48"
            />
          ) : null}
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {variant.discount}% off
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">{variant.name}</h3>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>Room only</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{variant.bedType} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Up to {variant.capacity} adults</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{variant.description}</p>
        
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Price for 1 night</p>
          <p className="text-xs text-gray-500 mb-2">Includes taxes & fees</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">RM{variant.originalPrice}</span>
            <span className="text-xl font-bold text-gray-800">RM{variant.price}</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {variant.discount}% off
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-green-600 text-sm cursor-pointer hover:underline">
            Cancellation policy →
          </span>
        </div>
        
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors">
          Select
        </button>
      </div>
    </div>
  );
});

export default RoomVariant;