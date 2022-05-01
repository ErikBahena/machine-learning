// export default createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },

//   palette: {
//     type: "dark",
//     primary: {
//       main: "#f17e1a",
//     },
//     secondary: {
//       main: "#26d0f9",
//     },
//   },

//   shape: {
//     borderRadius: 4,
//   },

//   components: {
//     MuiAccordion: {
//       defaultProps: {
//         square: true,
//         TransitionProps: {
//           unmountOnExit: true,
//         },
//       },

//       root: {
//         border: "1px solid rgba(255, 255, 255, .125)",
//         boxShadow: "none",
//         transition: defaultTheme.transitions.create("margin-left"),
//         "&:not(:last-child)": {
//           borderBottom: 0,
//         },
//         "&:before": {
//           display: "none",
//         },
//         "&$expanded": {
//           margin: "auto",
//         },
//         "&$disabled": {
//           marginLeft: 32,
//         },
//       },
//     },

//     MuiSwitch: {
//       root: {
//         width: 42,
//         height: 26,
//         padding: 0,
//         margin: 8,
//       },
//       switchBase: {
//         padding: 1,
//         "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
//           transform: "translateX(16px)",
//           color: "#fff",
//           "& + $track": {
//             opacity: 1,
//             border: "none",
//           },
//         },
//       },
//       thumb: {
//         width: 24,
//         height: 24,
//       },
//       track: {
//         borderRadius: 13,
//         border: "1px solid #bdbdbd",
//         backgroundColor: "#fafafa",
//         opacity: 1,
//         transition:
//           "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//       },
//     },

//     MuiAccordionSummary: {
//       root: {
//         borderBottom: "1px solid rgba(255, 255, 255, .125)",
//         minHeight: 56,
//         "&$expanded": {
//           minHeight: 56,
//         },
//       },
//       content: {
//         alignItems: "center",
//         justifyContent: "space-between",
//         "&$expanded": {
//           margin: "12px 0",
//         },
//       },
//     },
//     MuiAccordionDetails: {
//       root: {
//         backgroundColor: "#212121",
//       },
//     },
//     MuiDrawer: {
//       docked: {
//         "& $paper": {
//           position: "static",
//         },
//       },
//       paper: {},
//     },
//     MuiPopover: {
//       paper: {
//         backgroundColor: "#121212",
//       },
//     },
//   },
// })

import { createTheme } from "@material-ui/core"

export default createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f17e1a",
    },
    secondary: {
      main: "#26d0f9",
    },
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
})
