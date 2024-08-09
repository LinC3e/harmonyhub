import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="text-center" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Desarrollado por: Costilla Matias, Diaz Carlos, Zurita Esteban
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;