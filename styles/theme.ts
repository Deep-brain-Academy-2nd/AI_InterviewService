import baseStyled, { css, ThemedStyledInterface } from 'styled-components';

const sizes = {
  desktop: 1167,
  tablet: 778,
  phone: 576,
};

// Iterate through the sizes and create a media template
const media = {
  desktop: (...args) => undefined,
  tablet: (...args) => undefined,
  phone: (...args) => undefined,
};

Object.keys(sizes).reduce((acc, label: string) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(args.shift(), ...args)}
    }
  `;
  return acc;
}, media);

const color = {
  purple: "#8661de",
  blue: "#00bac7",
  gray: "#f6f6f6",
  green: "#07b495",
  lightGreen: "#99ecdd",
  darkGray: "#54595d",
};

const boxShadow = {
  normal: "0 3px 8px 0 rgb(0 0 0 / 10%)",
  purple: "0 3px 8px 0 #d6c9ff",
  blue: "0 3px 8px 0 #b3e2e6"
};

const theme = {
  color,
  media,
  boxShadow
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme