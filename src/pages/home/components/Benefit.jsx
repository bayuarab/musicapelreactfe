import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import {
  default as Box,
  default as Typography,
} from "@mui/material/Typography";
import React from "react";
import benefit from "../../../assets/Benefit.svg";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Benefit = () => {
  return (
    <Container maxWidth="100%">
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          color: "black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container>
          <Grid item xs={4}>
            <Box>
              <Img alt="complex" src={benefit} />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Box>
                <Typography
                  sx={{
                    marginTop: {
                      lg: "9%",
                      md: "9%",
                      sm: "4%",
                      xs: "0%",
                    },
                    fontSize: {
                      lg: "24px",
                      md: "20px",
                      sm: "16px",
                      xs: "10px",
                    },
                    color: "#5D5FEF",
                    fontWeight: "600",
                    fontFamily: "Poppins",
                  }}
                >
                  Benefit ikut Apel Course
                </Typography>
              </Box>
              <Box mt="2vh">
                <Typography
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "14px",
                      sm: "10px",
                      xs: "8px",
                    },
                    width: "90%",
                    textAlign: "justify",
                  }}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Benefit;
