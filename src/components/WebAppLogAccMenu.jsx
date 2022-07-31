import React, { useState } from "react";
import { Person, Logout } from "@mui/icons-material/";
import { Box } from "@mui/system";
import { Button, IconButton } from "@mui/material";
import styled from "@emotion/styled";

const SideIcons = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "36px",
  marginRight: "20px",
});

const BlackButton = styled(Button)({
  color: "black",
  textTransform: "Capitalize",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "500",
});

const WebAppLogAccMenu = () => {
  // const SideIcons = { iconStyle };
  const [loginState, setLoginState] = useState(false);

  const setLogMenu = () => {
    if (loginState) {
      return (
        <SideIcons>
          <IconButton>
            <Person />
          </IconButton>
          <IconButton>
            <Logout />
          </IconButton>
        </SideIcons>
      );
    }
    return (
      <SideIcons>
        <BlackButton>Daftar Sekarang</BlackButton>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Poppins",
            fontSize: "16px",
            backgroundColor: "#5D5FEF",
            borderRadius: "8px",
            textTransform: "Capitalize",
          }}
        >
          Masuk
        </Button>
      </SideIcons>
    );
  };

  return <div>{setLogMenu()}</div>;
};

export default WebAppLogAccMenu;
