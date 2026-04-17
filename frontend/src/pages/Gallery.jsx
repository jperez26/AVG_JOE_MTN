import React from 'react';
import { galleryPhotos } from '../mock';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { Camera } from 'lucide-react';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-stone-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Camera className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Photo Gallery
          </h1>
          <p className="text-xl text-stone-400">
            Capturing the beauty and challenge of each ascent
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryPhotos.map((photo) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <div className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-emerald-500 text-xs font-bold mb-1">{photo.summit}</div>
                      <div className="text-white text-sm">{photo.caption}</div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-5xl max-h-[95vh] p-0 bg-stone-900 border-stone-700">
                <div className="relative">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-auto max-h-[90vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent p-6">
                    <div className="text-emerald-500 font-bold mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      {photo.summit}
                    </div>
                    <div className="text-white text-lg">{photo.caption}</div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;