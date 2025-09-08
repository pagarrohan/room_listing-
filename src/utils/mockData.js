// Mock data generator for rooms
export const generateMockRooms = (count = 100) => {
  const rooms = [];
  const roomTypes = ['Deluxe Suite', 'Standard Room', 'Executive Suite', 'Presidential Suite', 'Ocean View', 'Garden View'];
  const descriptions = [
    'Spacious room with modern amenities and city view',
    'Comfortable accommodation with premium facilities',
    'Luxury suite with panoramic views and exclusive services',
    'Elegant room featuring contemporary design and comfort',
    'Premium accommodation with world-class amenities'
  ];

  for (let i = 1; i <= count; i++) {
    const hasVideo = Math.random() > 0.6; // 40% chance of having video
    const imageCount = Math.floor(Math.random() * 5) + 1;
    const variantCount = Math.floor(Math.random() * 6) + 2;
    
    const variants = [];
    for (let v = 1; v <= variantCount; v++) {
      variants.push({
        id: `${i}-${v}`,
        name: `${roomTypes[Math.floor(Math.random() * roomTypes.length)]} - Variant ${v}`,
        price: Math.floor(Math.random() * 3000) + 500,
        originalPrice: Math.floor(Math.random() * 4000) + 1000,
        discount: Math.floor(Math.random() * 40) + 10,
        bedType: ['Single', 'Double', 'Queen', 'King'][Math.floor(Math.random() * 4)],
        capacity: Math.floor(Math.random() * 4) + 1,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        video_url: hasVideo ? `https://sample-videos.com/zip/10/mp4/SampleVideo_${Math.floor(Math.random() * 5) + 1}.mp4` : null,
        room_images: !hasVideo || Math.random() > 0.3 ? Array.from({ length: imageCount }, (_, idx) => 
          `https://picsum.photos/400/300?random=${i * 10 + v * 5 + idx}`
        ) : []
      });
    }

    rooms.push({
      id: i,
      name: `Room ${i}`,
      variants,
      expanded: false
    });
  }
  return rooms;
};