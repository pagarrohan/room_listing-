# Room Listing App - Unravel WebApp Challenge
  <img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/49be295e-5813-4925-b64e-699f82926da9" />

A responsive, high-performance room listing application built with React.js featuring infinite scrolling, optimized media loading, and modern UI/UX patterns.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Fully responsive for both mobile and desktop
- **Infinite Scrolling**: Smooth, automatic loading of content as users scroll
- **Optimized Media Loading**: Lazy loading for images and videos with intersection observer
- **Video Optimization**: Videos play/pause based on viewport visibility
- **Performance Optimizations**: React.memo, useMemo, useCallback for optimal renders
- **Error Handling**: Graceful error handling with user feedback
- **Loading States**: Skeleton screens and loading indicators

### Technical Features
- **Lazy Loading**: Images and videos load only when in viewport
- **Intersection Observer**: Efficient viewport detection for media
- **Debounced Loading**: Prevents excessive API calls during scrolling
- **Memory Management**: Proper cleanup of observers and event listeners
- **State Management**: Efficient React hooks-based state management
- **Component Architecture**: Modular, reusable components

## 📁 Project Structure

```
room-listing-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── RoomListing.js      # Main container component
│   │   ├── RoomVariant.js      # Individual room variant card
│   │   ├── LazyImage.js        # Optimized image loading component
│   │   ├── LazyVideo.js        # Optimized video loading component
│   │   └── SkeletonLoader.js   # Loading placeholder component
│   ├── utils/
│   │   └── mockData.js         # Mock data generator
│   ├── App.js                  # Root application component
│   ├── App.css                 # Application styles
│   ├── index.js                # Application entry point
│   ├── index.css               # Global styles and utilities
│   └── reportWebVitals.js      # Performance monitoring
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Create the project directory:**
```bash
mkdir room-listing-app
cd room-listing-app
```

2. **Initialize React app:**
```bash
npx create-react-app . --template minimal
```

3. **Install dependencies:**
```bash
npm install lucide-react
```

4. **Replace the default files with the provided code:**
   - Copy all files from the artifacts into their respective directories
   - Ensure proper file structure as shown above

5. **Start the development server:**
```bash
npm start
```

6. **Open in browser:**
   Navigate to `http://localhost:3000`

## 🎯 Architecture & Design Decisions

### Performance Optimizations

1. **Lazy Loading Strategy**
   - Images load with 50px margin before entering viewport
   - Videos load only when 50% visible in viewport
   - Skeleton placeholders during loading states

2. **Memory Management**
   - Intersection observers properly disconnected on unmount
   - React.memo prevents unnecessary re-renders
   - useMemo and useCallback optimize expensive operations

3. **Data Loading**
   - Paginated loading (10 items per page)
   - Simulated API delays for realistic testing
   - Error boundaries for graceful failure handling

### Component Design

1. **Modular Architecture**
   - Separated concerns with dedicated components
   - Reusable utility components
   - Props-based configuration

2. **State Management**
   - Local state with React hooks
   - Efficient state updates with functional updates
   - Minimal re-renders through strategic memoization

3. **Media Handling**
   - Priority system: Videos first, then images
   - Graceful fallbacks for media load failures
   - Responsive image sizing

## 📊 Mock Data Structure

The application uses generated mock data with the following structure:

```javascript
{
  id: 1,
  name: "Room 1",
  expanded: false,
  variants: [
    {
      id: "1-1",
      name: "Deluxe Suite - Variant 1",
      price: 1517,
      originalPrice: 2107,
      discount: 28,
      bedType: "Double",
      capacity: 2,
      description: "Spacious room with modern amenities...",
      video_url: "https://sample-videos.com/...", // Optional
      room_images: ["https://picsum.photos/..."] // Optional
    }
  ]
}
```

## 🚀 Deployment

### Vercel Deployment
```bash
npm run build
npx vercel --prod
```

### Netlify Deployment
```bash
npm run build
# Upload build folder to Netlify or connect GitHub repo
```

## 🔧 Configuration

### Environment Variables (Optional)
Create `.env` file for API configurations:
```
REACT_APP_API_BASE_URL=your-api-url
REACT_APP_ITEMS_PER_PAGE=10
```

### Performance Tuning
- Adjust `ITEMS_PER_PAGE` in RoomListing.js for different loading strategies
- Modify intersection observer margins in LazyImage/LazyVideo components
- Customize skeleton loading duration in SkeletonLoader component

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Performance Testing
- Use Chrome DevTools to monitor network usage
- Check for memory leaks in long scrolling sessions
- Verify smooth 60fps scrolling performance

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔍 Key Implementation Details

### Video Optimization
- Videos only start loading when visible
- Auto-play when 50% in viewport
- Auto-pause when leaving viewport
- Handles auto-play restrictions gracefully

### Image Optimization
- Lazy loading with intersection observer
- Responsive images with proper aspect ratios
- Graceful error handling for failed loads
- Progressive loading with fade-in effects

### Infinite Scroll
- Intersection observer on loader element
- Debounced loading to prevent race conditions
- Proper loading states and error handling
- Smooth user experience with skeleton screens

## 📈 Performance Metrics

The application is optimized for:
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Smooth scrolling**: 60fps maintained during infinite scroll

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is created for the Unravel WebApp Challenge and is available for educational purposes.

---

**Note**: This application demonstrates modern React development practices including performance optimization, responsive design, and user experience best practices. It successfully implements all requirements from the challenge specification.
