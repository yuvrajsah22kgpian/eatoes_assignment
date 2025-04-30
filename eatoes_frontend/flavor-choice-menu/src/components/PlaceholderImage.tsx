
import React from 'react';
import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  text?: string;
  className?: string;
}

const getRandomColor = (text: string) => {
  // Generate a consistent color based on text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'bg-restaurant-primary/20', 'bg-restaurant-secondary/30', 
    'bg-restaurant-accent/20', 'bg-amber-100', 'bg-orange-50'
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  text = "Food Image", 
  className 
}) => {
  const colorClass = getRandomColor(text);
  
  return (
    <div className={cn(
      'flex items-center justify-center rounded-lg overflow-hidden aspect-video w-full',
      colorClass,
      className
    )}>
      <span className="text-restaurant-dark/70 font-medium text-sm text-center px-2">
        {text}
      </span>
    </div>
  );
};

export default PlaceholderImage;
