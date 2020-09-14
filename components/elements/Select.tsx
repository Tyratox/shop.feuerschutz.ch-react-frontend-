import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

import { colors, borders } from "../../utilities/style";

export default styled(Select)<{
  width?: number;
  flexGrow?: number;
  marginRight?: number;
}>`
  ${({ width }) => (width ? `width:${width}rem;` : "")}
  ${({ flexGrow }) => (flexGrow ? `flex-grow: ${flexGrow};` : "")}
  ${({ marginRight }) =>
    marginRight ? `margin-right: ${marginRight}rem;` : ""}
`;