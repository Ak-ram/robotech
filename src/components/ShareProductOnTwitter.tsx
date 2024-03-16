import React from 'react';
import PropTypes from 'prop-types';
import { TwitterShareButton } from 'react-share';
import { LucideTwitter } from 'lucide-react';

interface ShareProductOnTwitterProps {
  product: {
    id: string;
    description: string;
    title: string;
  };
  className?: string;
}

const ShareProductOnTwitter: React.FC<ShareProductOnTwitterProps> = ({ product, className }) => {
  if (!product || !product.id || !product.description || !product.title) {
    // Handle missing or invalid product data
    return null;
  }

  const shareUrl = `https://robotechspace.com/${product.id}`; // Construct the product URL dynamically

  return (
    <TwitterShareButton
      className={className}
      url={shareUrl}
      title={product.title}
      via="your-twitter-handle" // Replace with your Twitter handle
    >
      <LucideTwitter className="w-5 h-5 text-blue-500 mr-2" />
      <span className="font-semibold">
        Share on Twitter
      </span>
    </TwitterShareButton>
  );
};

ShareProductOnTwitter.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default ShareProductOnTwitter;