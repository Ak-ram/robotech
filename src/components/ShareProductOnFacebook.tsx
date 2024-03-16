import React from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton } from 'react-share';
import { Facebook } from 'lucide-react';

interface ShareProductOnFacebookProps {
  product: {
    id: string;
    description: string;
    title: string;
  };
  className?: string;
}

const ShareProductOnFacebook: React.FC<ShareProductOnFacebookProps> = ({ product, className }) => {
  if (!product || !product.id || !product.description || !product.title) {
    // Handle missing or invalid product data
    return null;
  }

  const shareUrl = `https://robotechspace.com/${product.id}`; // Construct the product URL dynamically

  return (
    <FacebookShareButton
      className={className}
      url={shareUrl}
      hashtag={product.title}
    >
      <Facebook className="w-5 h-5  text-blue-500 mr-2" />
      <span className="font-semibold">
        Share on Facebook
      </span>
    </FacebookShareButton>
  );
};

ShareProductOnFacebook.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default ShareProductOnFacebook;