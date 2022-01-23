import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
          main: "#20c997",
        }
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        color: "#20c997",
                        border: "1px solid #20c997"
                    },
                },
                {
                    props: { color: 'secondary' },
                    style: {
                        backgroundColor: `white`,
                    },
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'h4' },
                    style: {
                        color: "#495057",
                        fontWeight: "bold", 
                        marginBottom: "13px"
                    },
                },
                
            ],
        },
    },
});