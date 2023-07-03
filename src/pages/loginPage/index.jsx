import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
// Logo //
import Logo from "../../assets/logo.png";
// Component //
import Form from "./Form.jsx";

const LoginPage = () => {
  const isMobileScreen = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        backgroundColor="#001C30"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <img src={Logo} style={{ width: 32, height: 32 }} alt="Logo" />
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="#F1D00A"
            sx={{
              "&:hover": {
                color: "#3AB4F2",
                cursor: "pointer",
              },
            }}
          >
            expi
          </Typography>
        </div>
      </Box>
      <Box
        width={isMobileScreen ? "50%" : "80%"}
        p="2rem"
        m="2rem auto"
        borderRadius="0.4rem"
        backgroundColor="#F0F0F0"
      >
        <Typography
          textAlign="center"
          fontWeight="700"
          variant="h5"
          fontSize="18px"
          sx={{ mb: "1.5rem" }}
        >
          Share your world, discover others
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
