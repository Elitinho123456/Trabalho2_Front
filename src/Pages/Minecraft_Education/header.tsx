
import React from 'react';
import { PickaxeIcon } from '../constants';

const Header = () => {
  return (
    <header className="text-center py-8">
        <div className="inline-flex items-center gap-4">
            <PickaxeIcon className="w-16 h-16 transform -scale-x-100" />
            <h1 className="text-5xl md:text-6xl text-white" style={{ textShadow: '4px 4px 0 #382d2a, 6px 6px 0 #000' }}>
                EduCraft AI
            </h1>
            <PickaxeIcon className="w-16 h-16" />
        </div>
        <p className="text-gray-300 mt-4 text-sm md:text-base tracking-wider">
            AI-Powered Lesson Plans for Creative Minds
        </p>
    </header>
  );
};

export default Header;
