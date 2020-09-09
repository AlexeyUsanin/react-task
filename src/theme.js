import { createMuiTheme } from '@material-ui/core/styles'

const { breakpoints } = createMuiTheme()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111213',
    },
    secondary: {
      main: '#fff',
    },
    background: {
      default: '#010102 ',
      paper: '#1B1C1E',
    },
    text: {
      primary: '#fff',
      secondary: '#989AA1',
    },
  },
  typography: {
    htmlFontSize: 16,
    body1: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 500,
    },
    body2: {
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 30,
      fontWeight: 500,
      [breakpoints.down(768)]: {
        fontSize: 20,
      },
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 500,
    },
    caption: {
      fontSize: 16,
      fontWeight: 400,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          '@media (display-mode: standalone)': {
            WebkitFontSmoothing: 'antialiased',
            fontVariantLigatures: 'common-ligatures',
            textRendering: 'optimizeLegibility',
            backfaceVisibility: 'hidden',
            '&::-webkit-scrollbar': {
              width: 0,
            },
          },
        },
        body: {
          overflowX: 'hidden',
          '@media (display-mode: standalone)': {
            '-webkit-tap-highlight-color': 'transparent',
            '-webkit-touch-callout': 'none',
            '-webkit-overflow-scrolling': 'touch',
            '-webkit-user-select': 'none',
            'user-select': 'none',
            boxSizing: 'border-box',
          },
        },
      },
    },
    MuiLink: {
      root: {
        fontSize: 16,
        color: '#BDBDBD',
        cursor: 'pointer',

        '&.active': {
          color: '#F2F2F2',
        },
      },
    },
    MuiAppBar: {
      root: {
        minHeight: 60,
        background: '#111213',
        borderBottom: '1px solid #252627',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        fontSize: 18,
        fontWeight: 500,
        color: '#1F2127',
      },
      contained: {
        padding: '12px 24px',
        backgroundColor: '#fff',
        '&$disabled': {
          filter: 'brightness(0.6)',
          backgroundColor: '#fff',
        },
        [breakpoints.down(400)]: {
          padding: '5px 8px',
        },
      },
      outlined: { border: '1px solid #414453' },
    },
    MuiCheckbox: {
      root: {
        color: '#fff',
      },
    },
    MuiRadio: {
      root: {
        color: '#fff',
        '& svg:first-child': { transform: 'scale(1)' },
      },
    },
    MuiInputBase: {
      root: {
        background: '#2D2F33',
      },
    },
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          backgroundColor: 'transparent !important',
          appearance: 'none',
          boxShadow: 'inset 0 0 0 1px #2D2F33, inset 0 0 0 100px #2D2F33',
          '-webkit-text-fill-color': ' #fff',
          '-webkit-rtl-ordering': 'visual',
          color: '#fff !important',
          caretColor: '#fff',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: '#989AA1',
        '&$focused': {
          color: '#fff',
        },
      },
    },
    MuiCard: {
      root: {
        minWidth: 275,
        marginBottom: 10,
        width: '100%',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#38393A',
        '&$light': {
          backgroundColor: '#fff',
        },
      },
    },
    MuiListItem: {
      root: {
        '&$divider': {
          borderColor: '#fff',
        },
      },
    },
    MuiIconButton: {
      root: {
        color: '#fff',
      },
    },
    MuiListSubheader: {
      root: {
        color: '#989AA1',
      },
    },
    MuiPickersFadeTransition: {
      transitionContainer: {
        '& h6': {
          fontSize: 20,
        },
      },
    },
    MuiPickersCalendar: {
      root: {
        minHeight: 235,
      },
      weekDayLabel: {
        color: '#fff',
      },
    },
    MuiPickersModalDialog: {
      dialogAction: {
        '& button': {
          color: '#fff',
        },
      },
      dialogContainer: {
        '&:focus': {
          '& > .MuiPickersModalDialog-dialogRoot': {
            outlineWidth: 0,
          },
        },
      },
      dialogRoot: {
        '&:focus': {
          outlineWidth: 0,
        },
      },
    },
    MuiPickersDateRangeDay: {
      rangeIntervalPreview: {
        '&$rangeIntervalDayPreview': {
          backgroundColor: '#2D2F33',
        },
      },
    },
    MuiPickersDay: {
      root: {
        '&$selected': {
          backgroundColor: '#414453',
          '&:hover': {
            backgroundColor: '#414453',
          },
        },
        '&:focus': {
          '&$selected': {
            backgroundColor: '#414453',
          },
        },
      },
    },
    MuiPickersArrowSwitcher: {
      previousMonthButtonMargin: {
        marginRight: 5,
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: 370,
        minWidth: 320,
        width: 'auto',
      },
    },
    MuiPickersYearSelection: {
      root: {
        overflowY: 'initial',
      },
    },
    MuiPickersYear: {
      yearButton: {
        fontSize: 20,
      },
    },
    MuiPickersCalendarView: {
      viewTransitionContainer: {
        '&::-webkit-scrollbar': {
          width: 5,
          background: '#F2F2F2',
          borderRadius: 10,
        },
        '&::-webkit-scrollbar-track': {
          height: '80%',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#BDBDBD',
        },
      },
    },
    MuiSelect: {
      icon: {
        color: '#fff',
      },
    },
    MuiPickersCalendarHeader: {
      root: {
        justifyContent: 'space-between',
      },
      monthTitleContainer: {
        maxHeight: 45,
        alignItems: 'center',
        marginRight: 0,
      },
    },
    MuiTabPanel: {
      root: {
        paddingRight: 0,
        paddingLeft: 0,
      },
    },
  },
})

export default theme
