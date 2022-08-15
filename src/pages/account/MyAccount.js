import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyAccount = () => {
  const [expanded, setExpanded] = useState(false);
  const { auth } = useAuth();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <center>
        <Box
          sx={{
            padding: "4%",
            paddingTop: "6%",
            paddingBottom: "7%",
          }}
        >
          <Avatar
            alt={auth.nama}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 125, height: 125 }}
          />
          <Box mt={"30px"} sx={{ width: "380px" }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    width: "100%",
                    flexShrink: 0,
                    fontWeight: "400",
                    fontFamily: "Poppins",
                  }}
                >
                  {auth.nama}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ paddingLeft: "5%", paddingRight: "5%" }}>
                <Typography
                  textAlign={"left"}
                  sx={{
                    fontSize: "18px",
                    fontFamily: "Poppins",
                    fontWeight: "400",
                  }}
                >
                  Email : {auth.email}
                </Typography>
                <Box mt={"45px"} paddingBottom={"7px"}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#F2C94C",
                      color: "black",
                      fontFamily: "Poppins",
                      textTransform: "capitalize",
                    }}
                  >
                    Change Password
                  </Button>
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h7">Email:</Typography>
                </Box> */}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </center>
    </div>
  );
};

export default MyAccount;
