import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import FlexBetween from "./FlexBetween";
import UserImg from "./UserImg";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";

// Base Url//
import baseUrl from "../../assets/URL/baseUrl.js";

const FriendsDisplay = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const res = await fetch(`${baseUrl}users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImg image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // Refresh the friend //
            navigate(0);
          }}
        >
          <Typography
            variant="h6"
            color="#000"
            fontWeight="500"
            sx={{ "&:hover": { color: "#001C30", cursor: "pointer" } }}
          >
            {name}
          </Typography>
          <Typography color="#000" fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: "#C5DFF8", padding: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: "#001C30" }} />
        ) : (
          <PersonAddOutlined sx={{ color: "#001C30" }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default FriendsDisplay;
