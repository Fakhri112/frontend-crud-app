import React from 'react';
import { Header } from './Header';

export const About = () => {
  return <div>
    <Header status="about" />
    <div className="text-center">
      <h2>This is About Page</h2>
      <h4>Why do you come here? 🤔</h4>
    </div>
  </div>;
};
