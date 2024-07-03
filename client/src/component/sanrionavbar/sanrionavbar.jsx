import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './sanrionavbar.css';

function sanrionavbar() {
  return (
    <nav className="sanrio-navbar">
      <ScrollLink to="pompompurin" smooth={true} duration={500}>폼폼푸린</ScrollLink>
      <ScrollLink to="cinnamoroll" smooth={true} duration={500}>시나모롤</ScrollLink>
      <ScrollLink to="kuromi" smooth={true} duration={500}>쿠로미</ScrollLink>
      <ScrollLink to="hellokitty" smooth={true} duration={500}>헬로키티</ScrollLink>
    </nav>
  );
}

export default sanrionavbar;
