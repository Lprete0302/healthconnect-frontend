// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center p-4 mt-10 text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Health Connect. All rights reserved.
    </footer>
  );
};

export default Footer;
