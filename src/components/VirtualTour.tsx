import React, { useState } from 'react';
import { Play, Maximize2, X } from 'lucide-react';

interface VirtualTourProps {
  tourUrl: string;
  thumbnailUrl: string;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ tourUrl, thumbnailUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative">
      {!isPlaying ? (
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt="Virtual Tour Thumbnail"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity"
          >
            <Play className="w-16 h-16 text-white" />
          </button>
        </div>
      ) : (
        <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          )}
          <iframe
            src={tourUrl}
            title="Virtual Tour"
            className={`w-full ${isFullscreen ? 'h-screen' : 'h-96'} rounded-lg`}
            allowFullScreen
          />
          {!isFullscreen && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              <Maximize2 size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VirtualTour; 