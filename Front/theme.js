import createTheme from '@mui/material/styles/createTheme'
import customPalette from './customPalette'
// import { Colors } from './src/utils/Colors'

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 750,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	palette: {
		primary: {
			main: customPalette.primary.main,		
		},
		secondary: {
			main: customPalette.secondary.main,			
		},
		accent: {
			main: customPalette.acent.main,
		},
        yellowButtonBG: {
            main: customPalette.primary.main,
        },
		brownButtonText: {
			main: customPalette.acent.main,
        },
        brownButtonBG: {
            main: customPalette.secondary.main,
            dark: customPalette.secondary.dark,
        },
        grayButtonBG: {
            main: customPalette.terciary.main,
            dark: customPalette.terciary.dark,
        },
        grayButtonText: {
            main: customPalette.text.main,
        },
        text: {
            main: customPalette.text.main,
            light: customPalette.text.light,
        },
	},
	typography: {
		p: {
			fontSize: '0.8rem',
		},
	},
	components: {
		MuiTypography: {
			defaultProps: {
				fontFamily: 'Montserrat',
				fontWeight: 600,
			},
		},
		MuiSkeleton: {
			defaultProps: {
				animation: 'wave',
			},
			styleOverrides: {
				root: {
					'-webkit-transform': 'scale(1)',
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontWeight: 600,
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						fontWeight: 600,
						color: '#5c5c5c',
						'&.Mui-disabled': {
							backgroundColor: '#6e6e6e42',
						},
					},
				},
			},
		},
		MuiLoadingButton: {
			defaultProps: {
				variant: 'contained',
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					color: '#5c5c5c',
					fontWeight: 600,
					minWidth: 223,
				},
				filled: {
					fontWeight: 600,
					color: '#5c5c5c',
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					minWidth: 223,
				},
			},
		},
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
			styleOverrides: {
				root: {
					fontWeight: 400,
					borderRadius: 5,
					textTransform: 'none',
				},
			},
		},
	},
})

export default theme