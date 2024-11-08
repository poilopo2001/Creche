import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">DayCareConnect</h3>
            <p className="text-gray-400">Find the perfect daycare for your little ones.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition duration-300">FAQ</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition duration-300">Blog</Link></li>
              <li><Link to="/parenting-tips" className="text-gray-400 hover:text-white transition duration-300">Parenting Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Providers</h4>
            <ul className="space-y-2">
              <li><Link to="/list-your-daycare" className="text-gray-400 hover:text-white transition duration-300">List Your Daycare</Link></li>
              <li><Link to="/provider-resources" className="text-gray-400 hover:text-white transition duration-300">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300"><Instagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} DayCareConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;