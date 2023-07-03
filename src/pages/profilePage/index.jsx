import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Style components //
import { Box, useMediaQuery } from "@mui/material";
// Component //
import Navbar from "../navbar";
import FriendLists from "../../components/Widgets/FriendLists.jsx";
import PostsWidgets from "../../components/Widgets/PostsWidgets.jsx";
import UserWidgets from "../../components/Widgets/UserWidgets.jsx";
// BaseUrl //
import baseUrl from "../../assets/URL/baseUrl.js";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const res = await fetch(`${baseUrl}users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        gap="2rem"
        justifyContent="center"
        display={isNonMobileScreens ? "flex" : "block"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendLists userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* Posts */}
          <PostsWidgets userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
