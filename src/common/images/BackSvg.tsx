
import { FC } from "react";

const BackSvg: FC = () => {
  return (
  <svg height="32" width="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" fill="lightblue"/>
    <line x1="7" y1="16" x2="27" y2="16" stroke-width="3" stroke="black" /> 
    <line x1="5" y1="16" x2="14" y2="26" stroke-width="3" stroke="black" /> 
    <line x1="5" y1="16" x2="14" y2="6" stroke-width="3" stroke="black" />
  </svg>
);
}

export default BackSvg;
