import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
// import "../App.css";

const factItems = [
  {
    title: "500+",
    subtitle:
      "Lebih dari sekedar kelas biasa yang bisa mengeluarkan bakat kalian",
  },
  {
    title: "50+",
    subtitle: "Lulusan yang menjadi musisi ternama dengan skill memukau",
  },
  {
    title: "10+",
    subtitle: "Coach Special kolaborasi dengan musisi terkenal",
  },
];

// {gridItems.map((item) => (
//   <ListItem key={item} disablePadding>
//     <ListItemButton sx={{ textAlign: 'center' }}>
//       <ListItemText primary={item} />
//     </ListItemButton>
//   </ListItem>
// ))};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

export default function Fact() {
  return (
    <Box
      mb={{
        md: "4%",
        xs: "3%",
      }}
      sx={{ flexGrow: 1, width: "78%" }}
    >
      <Grid
        container
        spacing={{
          lg: 5,
          md: 5,
          sm: 3,
          xs: 2,
        }}
      >
        {factItems.map((item, index) => (
          <Grid key={index} item xs={4}>
            <Item
              sx={{
                height: {
                  md: "28vh",
                  sm: "20vh",
                  xs: "18vh",
                },
              }}
            >
              <Box>
                <Typography
                  mt="1.5vh"
                  sx={{
                    color: "blue",
                    fontWeight: "bold",
                    fontSize: {
                      lg: "48px",
                      md: "40px",
                      sm: "32px",
                      xs: "20px",
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
              <Box sx={{ height: "hug" }}>
                <Typography
                  mt="3vh"
                  sx={{
                    fontWeight: "600",
                    fontSize: {
                      lg: "16px",
                      md: "14px",
                      sm: "12px",
                      xs: "6px",
                    },
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
