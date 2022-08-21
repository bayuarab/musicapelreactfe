import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../api/userAPI";
import Loading from "../../components/Loading";
import { useComponentBarState } from "../../context/ComponentStateProvider";
import useAuth from "../../hooks/useAuth";

const ImgContainer = styled(Box)(({ theme }) => ({
  display: "block",
  marginRight: "6px",
  borderRadius: "12px",
  borderColor: "#828282",
  [theme.breakpoints.up("md")]: {
    display: "block",
    borderRadius: "16px",
    marginRight: "15px",
    width: "200px",
    height: "133px",
  },
}));

const MyCourses = () => {
  const [myCourseData, setMyCourseData] = useState([]);
  const { setComponentState } = useComponentBarState();
  const [loadState, setLoadState] = useState(true);
  const { auth } = useAuth();
  const UserId = auth?.userId;
  const token = auth?.token;

  const [apiDataMessage, setApiDataMessage] = useState(
    "Mengambil data ke server, harap tunggu"
  );

  useEffect(() => {
    setComponentState({ paymentPageState: false, footerState: true });
  }, [setComponentState]);

  useEffect(() => {
    const fetchApi = async () => {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const response = await api.get(`/Courses/${UserId}`, config);
        setMyCourseData(response.data);
        setLoadState(false);
      } catch (err) {
        setLoadState(false);
        if (err.response.data === "Not Found")
          setApiDataMessage("Masih kosong, silahkan belanja");
      }
    };

    fetchApi();
  }, [UserId, token]);

  return loadState ? (
    <Box sx={{ paddingTop: { md: "50px", xs: "20px" } }}>
      <Loading />
    </Box>
  ) : myCourseData?.length <= 0 ? (
    <Box sx={{ marginTop: "60px" }}>
      <Typography variant="h5" sx={{ textAlign: "center", color: "#5D5FEF" }}>
        {apiDataMessage}
      </Typography>
    </Box>
  ) : (
    <Box maxWidth={"100%"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          paddingLeft: "4.5%",
          paddingRight: "4.5%",
          paddingTop: { md: "45px", xs: "30px" },
          paddingBottom: "60px",
        }}
      >
        {myCourseData.map((items, index) => {
          return (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ImgContainer>
                  <Box
                    component={"img"}
                    src={`data:image/jpeg;base64,${items.courseImage}`}
                    alt={items.course}
                    loading="lazy"
                    objectfit="true"
                    sx={{
                      width: { md: "200px", xs: "100px" },
                      minHeight: { md: "133px" },
                      borderRadius: { md: "16px", xs: "10px" },
                    }}
                  />
                </ImgContainer>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { md: "8px", xs: "4px" },
                    marginLeft: "8px",
                    width: "80vw",
                  }}
                >
                  <Typography
                    sx={{
                      paddingTop: { md: "10px", xs: "4px" },
                      fontFamily: "Poppins",
                      fontSize: { md: "16px", xs: "12px" },
                      fontWeight: "400",
                      color: "#828282",
                      display: { md: "block", xs: "none" },
                    }}
                  >
                    {items.category}
                  </Typography>
                  <Typography
                    sx={{
                      marginTop: "-6px",
                      fontFamily: "Poppins",
                      fontSize: { md: "24px", xs: "14px" },
                      fontWeight: "600",
                      color: "#333333",
                    }}
                  >
                    {items.course}
                  </Typography>
                  <Typography
                    sx={{
                      marginTop: { md: "0px", xs: "-6px" },
                      fontFamily: "Poppins",
                      fontSize: { md: "20px", xs: "14px" },
                      fontWeight: "500",
                      color: "#5D5FEF",
                    }}
                  >
                    {items.schedule}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mt: { md: "18px", xs: "13px" } }} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MyCourses;
