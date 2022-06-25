import { extendTheme, ChakraTheme, useColorMode, theme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const colors = {
  brand: {
    100: 'rgba(245, 93, 36, 0.12)',
    500: '#F55D24',
  },
  orange: {
    400: '#F76E3C',
    500: '#F55D24',
    light: '#F55D24',
    dark: '#ca5c34',
  },
  purble: {
    500: '#BE58EE',
    100: 'rgba(190, 88, 238, 0.12)',
  },
  black: {
    500: '#1F1F1F',
    800: '#070707',
  },
  gray: {
    50: '#f7fafc',
    200: '#2E2E2E',
    700: '#141414',
    800: '#070707',
    900: '#000000',
  },
  bgBody: {
    light: '#F7F6F9',
    dark: '#111111',
  },
  textColor: {
    light: '#878787',
    dark: 'rgba(255, 255, 255, 0.6)',
    grayLight: '#575757',
    grayDark: 'rgba(255, 255, 255, 0.8)',
  },
  inputColor: {
    borderLight: '#E2E8F0',
    borderDark: '#2E2E2E',
    bgDark: '#0D0D0D',
    bgLight: '#ffffff',
    textLight: 'rgba(0, 0, 0, 0.46)',
    textDark: 'rgba(255, 255, 255, 0.6)',
  },
  iconInput: {
    light: '#878787',
    dark: '#cdcdcd',
  },
  facebook: {
    light: '#FFFFFF',
    dark: 'rgba(78, 116, 188, 0.8)',
  },
  facebookBorder: {
    light: 'rgba(66, 103, 174, 1)',
    dark: 'rgba(78, 116, 188, 1)',
  },
  google: {
    light: '#FFFFFF',
    dark: 'rgba(92, 149, 242, 0.8)',
  },
  googleBorder: {
    light: 'rgba(68, 133, 240, 1)',
    dark: 'rgba(92, 149, 242, 1)',
  },
  textLabel: {
    light: '#2D3748',
    dark: 'rgba(255, 255, 255, 0.8)',
  },
}

const fonts = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
}

const components = {
  Input: {
    baseStyle: (props) => ({
      field: {
        // outline: 0,
        mt: '8px',
        bg: mode('inputColor.bgLight', 'gray.800')(props),
        backgroundColor: mode('inputColor.bgLight', 'gray.800')(props),
        width: '100%',
      },
    }),

    variants: {
      outline: (props) => ({
        field: {
          color: mode('inputColor.textLight', 'inputColor.textDark')(props),
          border: '1px solid',
          borderColor: mode(
            'inputColor.borderLight',
            'inputColor.borderDark',
          )(props),
          _focus: {
            borderColor: 'primary',
            boxShadow: 'none',
          },
        },
      }),
    },
  },

  Button: {
    ...theme.components.Button.defaultProps,
    ...theme.components.Button.sizes,
    ...theme.components.Button.baseStyle,
    baseStyle: (props) => ({
      bg: mode('primary', 'primary')(props),
      background: mode('primary', 'primary')(props),
      borderRadius: '6px',
      fontWeight: '700',

      _hover: {
        bg: mode('secondary', 'secondary')(props),
        backgroundColor: mode('secondary', 'secondary'),
        color: '#fff',
      },
      _active: {
        backgroundColor: mode('secondary', 'secondary'),
        bg: mode('secondary', 'secondary')(props),
      },
    }),
    variants: {
      solid: (props) => ({
        ...theme.components.Button.defaultProps,
        ...theme.components.Button.variants.solid(props),

        bg: mode('primary', 'primary')(props),
        background: mode('primary', 'primary')(props),
        color: '#fff',

        _hover: {
          bg: mode('secondary', 'secondary')(props),
          backgroundColor: mode('secondary', 'secondary'),
        },
      }),

      outline: (props) => ({
        ...theme.components.Button.variants.outline(props),
        bg: 'transparent',
        background: 'transparent',
        borderColor: mode('primary', 'primary')(props),
        color: mode('primary', 'primary')(props),

        _hover: {
          bg: mode('secondary', 'secondary')(props),
          backgroundColor: mode('secondary', 'secondary')(props),
          color: '#fff',
        },
      }),
    },
  },

  Divider: {
    baseStyle: {
      ...theme.components.Divider.baseStyle,
      borderColor: 'auto',
    },
    ...theme.components.Divider.defaultProps,
    ...theme.components.Divider.variants,

    defaultProps: { size: 'md' },
  },
}

const orangeTheme = extendTheme({
  config,
  fonts,
  components,
  colors: {
    ...theme.colors,
    ...colors,
    primary: '#F55D24',
    secondary: '#F76E3C',
    secondaryLight: '#f76e3c45',
    secondaryCustom: 'rgba(231, 76, 60, 0.7)',
  },
})

const purpleTheme = extendTheme({
  config,
  fonts,
  colors: {
    ...theme.colors,
    ...colors,
    primary: '#BE58EE',
    secondary: 'rgba(190, 88, 238, 0.8)',
    secondaryLight: 'rgba(190, 88, 238, 0.2)',
    secondaryCustom: 'rgba(190, 88, 238, 0.6)',
  },
  components,
})

export { orangeTheme, purpleTheme }
