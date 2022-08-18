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
  [theme.breakpoints.up("sm")]: {
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
                    minHeight: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginLeft: "8px",
                    width: { md: "55vw" },
                  }}
                >
                  <Box
                    sx={{
                      display: { sm: "none" },
                      mb: "-20px",
                    }}
                  >
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        overflowWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        mt: { md: "-4px", sm: "-3px", xs: "-5px" },
                        mb: { sm: "10px", xs: "-10px" },
                        fontFamily: "Poppins",
                        fontSize: { md: "24px", sm: "20px", xs: "18px" },
                        fontWeight: "600",
                        color: "#333333",
                      }}
                    >
                      {items.course}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: { xs: "flex", sm: "flex" },
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component={"img"}
                      src={`data:image/jpeg;base64,${items.courseImage}`}
                      alt={items.course}
                      loading="lazy"
                      objectfit="true"
                      width={"100px"}
                      height={"60px"}
                      sx={{
                        borderRadius: "10px",
                        display: { sm: "none" },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        marginLeft: "10px",
                        width: { md: "55vw", xs: "40vw" },
                        minHeight: { md: "133px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: { md: "16px" },
                          fontWeight: "400",
                          color: "#828282",
                        }}
                      >
                        {items.category}
                      </Typography>
                      <Typography
                        sx={{
                          mt: { md: "-4px", sm: "3px" },
                          fontFamily: "Poppins",
                          fontSize: { md: "24px", sm: "24px", xs: "18px" },
                          fontWeight: "600",
                          color: "#333333",
                          display: { md: "block", sm: "block", xs: "none" },
                        }}
                      >
                        {items.course}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: { md: "16px", sm: "14px", xs: "14px" },
                          fontWeight: "400",
                          color: "#4F4F4F",
                        }}
                      >
                        {items.schedule}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: { md: "20px", sm: "16px", xs: "16px" },
                          fontWeight: "600",
                          color: "#5D5FEF",
                        }}
                      >
                        IDR {items.price?.toLocaleString("de-DE")}
                      </Typography>
                    </Box>
                  </Box>
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
