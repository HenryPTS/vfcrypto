import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {
  width?: number,
  height?: number,
  color?: string
}

const FilterSvg: FC<Props> = ({
  width = "24",
  height = "24",
  color = "#DDDDDD"
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M22 3L2 3 10 12.46 10 19 14 21 14 12.46 22 3z"></path>
    </svg>
  );
}

export default FilterSvg;
