import { Box, Divider, styled, Typography } from "@mui/material";
import React from "react";

const ImgContainer = styled(Box)(({ theme }) => ({
  display: "none",
  marginRight: "15px",
  width: "200px",
  height: "133px",
  borderRadius: "16px",
  borderColor: "#828282",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

const MyCourses = () => {
  const myCourse = [
    {
      id_product: "1",
      course_category_id: "1",
      course_category: "Drum",
      course_name: "Kursus Drummer Special Coach (Eno Netral)",
      schedule: "Senin, 25 Juli 2022",
    },
    {
      id_product: "9",
      course_category_id: "4",
      course_category: "Biola",
      course_name: "Biola Mid-Level Course",
      schedule: "Sabtu, 23 Juli 2022",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        paddingLeft: "4.2vw",
        paddingRight: "4.2vw",
        paddingTop: "45px",
        paddingBottom: "30px",
      }}
    >
      {myCourse.map((items) => {
        return (
          <Box key={items.id_product}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ImgContainer>
                  <img
                    src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
                    alt={items.course_name}
                    loading="lazy"
                    objectfit="true"
                    width={"200px"}
                    height={"133px"}
                    style={{
                      borderRadius: "16px",
                    }}
                  />
                </ImgContainer>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginLeft: "8px",
                    width: "80vw",
                  }}
                >
                  <Typography
                    sx={{
                      paddingTop: "10px",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#828282",
                    }}
                  >
                    {items.course_category}
                  </Typography>
                  <Typography
                    sx={{
                      marginTop: "-6px",
                      fontFamily: "Poppins",
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#333333",
                    }}
                  >
                    {items.course_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      fontWeight: "400",
                      color: "#5D5FEF",
                    }}
                  >
                    {items.schedule}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ mt: "18px" }} />
          </Box>
        );
      })}
    </Box>
  );
};

export default MyCourses;
