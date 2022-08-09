import { DeleteForever } from "@mui/icons-material";
import { Box, Divider, IconButton, styled, Typography } from "@mui/material";
import React from "react";

const DeleteText = styled(Typography)(({ theme }) => ({
  display: "none",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "500",
  color: "#333333",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

const ImgContainer = styled(Box)(({ theme }) => ({
  display: "none",
  marginLeft: "2%",
  marginRight: "15px",
  width: "200px",
  height: "133px",
  borderRadius: "16px",
  borderColor: "#828282",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

const CartList = (props) => {
  const { Cart, handleCheck, handleChange, StyledCheckbox, handleDelete } =
    props;

  const onDelete = (itemsID) => {
    handleDelete(itemsID);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {Cart.map((items) => {
        return (
          <Box key={items.id}>
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
                <Box>
                  <StyledCheckbox
                    value={items.id}
                    checked={handleCheck(items.id)}
                    onChange={handleChange}
                  />
                </Box>
                <ImgContainer>
                  <img
                    src={items.courseImage}
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
                    minHeight: "133px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginLeft: "8px",
                    width: "55vw",
                  }}
                >
                  <Typography
                    sx={{
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
                      mt: "-4px",
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
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#4F4F4F",
                    }}
                  >
                    {items.schedule}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#5D5FEF",
                    }}
                  >
                    IDR {items.price?.toLocaleString("de-DE")}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => onDelete(items.id)}
                >
                  <DeleteForever fontSize="small" sx={{ color: "#EB5757" }} />
                </IconButton>
                <DeleteText onClick={() => onDelete(items.id)}>
                  Delete
                </DeleteText>
              </Box>
            </Box>
            <Divider sx={{ mt: "18px" }} />
          </Box>
        );
      })}
    </Box>
  );
};

export default CartList;
