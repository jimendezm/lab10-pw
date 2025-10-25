import React from 'react';
import '../styles/Skeleton.css';

const Skeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-price"></div>
      </div>
    </div>
  );
};

export default Skeleton;