import React from "react";
import { Box, useMediaQuery } from "@mui/material";
// Component //
import Navbar from "pages/navbar";
import UserWidgets from "../../components/Widgets/UserWidgets.jsx";
import CreatePostWidgets from "../../components/Widgets/CreatePostWidgets.jsx";
import PostsWidgets from "../../components/Widgets/PostsWidgets.jsx";
import FriendLists from "../../components/Widgets/FriendLists.jsx";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        gap="0.5rem"
        justifyContent="space-between"
        display={isNonMobileScreens ? "flex" : "block"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* Posts */}
          <CreatePostWidgets picturePath={picturePath} />
          <PostsWidgets userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendLists userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
