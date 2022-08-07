import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../api/userAPI";

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
  const [myCourseData, setMyCourseData] = useState([]);
  const [userID, setUserID] = useState(1);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get(`/Courses/${userID}`);
        console.log(response.data);
        setMyCourseData(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };

    fetchApi();
  }, [userID]);

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
      {myCourseData.map((items, index) => {
        return (
          <Box key={index}>
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
                    alt={items.course}
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
                    {items.category}
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
                    {items.course}
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
