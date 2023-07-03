import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Style components //
import { ManageAccountsOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
// Component //
import FlexBetween from "../Styles/FlexBetween";
import UserImg from "../Styles/UserImg";
import WidgetWrapper from "../Styles/WidgetWrapper";
// base url //
import baseUrl from "../../assets/URL/baseUrl.js";

const UserWidgets = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  // Api calls //
  const getUser = async () => {
    const res = await fetch(`${baseUrl}users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data);
  };
  // Load on render //
  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { name, friends } = user;

  return (
    <WidgetWrapper>
      {/* name row */}
      <FlexBetween
        gap="0.5rem"
        paddingBottom="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImg image={picturePath} />
          <Box>
            <Typography
              variant="h6"
              color="#000"
              fontWeight="500"
              sx={{ "&:hover": { color: "#001C30", cursor: "pointer" } }}
            >
              {name}
            </Typography>
            <Typography color="#2D4356">{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserWidgets;
