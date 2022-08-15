import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../api/userAPI";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";

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
  const { setComponentState } = useComponentBarState();
  const { auth } = useAuth();
  const UserId = auth?.userId;
  const [apiDataMessage, setApiDataMessage] = useState(
    "Mengambil data ke server, harap tunggu"
  );

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: true });
  }, [setComponentState]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get(`/Courses/${UserId}`);
        console.log(response.data);
        setMyCourseData(response.data);
      } catch (err) {
        !err.response
          ? console.log(`Error: ${err.message}`)
          : console.log(err.response.data);
        if (err.response.data === "Not Found")
          setApiDataMessage("Masih kosong, silahkan belanja");
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    };

    fetchApi();
  }, [UserId]);

  return myCourseData?.length <= 0 ? (
    <Box sx={{ marginTop: "60px" }}>
      <Typography variant="h5" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        {apiDataMessage}
      </Typography>
    </Box>
  ) : (
    <Box
    // style={{
    //   paddingTop: "45px",
    //   paddingBottom: "100px",
    // }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          // paddingLeft: "4.5%",
          // paddingRight: "4.5%",
          paddingTop: "45px",
          paddingBottom: "60px",
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
                      src={`data:image/jpeg;base64,${items.courseImage}`}
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
    </Box>
  );
};

export default MyCourses;
