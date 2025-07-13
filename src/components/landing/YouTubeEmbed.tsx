import React from 'react';

interface YouTubeEmbedProps {
  embedId: string;
  title: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ embedId, title }) => (
  <div className="aspect-w-20 w-80 aspect-h-16">
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-lg shadow-lg min-h-[500px]"
    ></iframe>
  </div>
);

export default YouTubeEmbed;
