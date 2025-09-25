export interface themePropsType {
  colors: {
    primary: string;
    text: string;
    background: string;
  };
  fonts: {
    main: string;
  };
  fontSizes: {
    base: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    priceLarge: string;
    priceSmall: string;
  };
}

const theme = {
  colors: {
    primary: "#ee4d2d",
    text: "#000000",
    background: "#ffffff",
  },
  fonts: {
    main: `'Roboto', Arial, sans-serif`,
  },
  fontSizes: {
    base: "1.2rem",
    small: "1.3rem",
    medium: "1.4rem",
    large: "2rem",
    xlarge: "2.4rem",
    priceLarge: "1.8rem",
    priceSmall: "1.6rem",
  },
};

export default theme;
