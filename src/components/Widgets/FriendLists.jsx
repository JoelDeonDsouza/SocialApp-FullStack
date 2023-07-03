import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import WidgetWrapper from "../Styles/WidgetWrapper";
import FriendsDisplay from "../Styles/FriendsDisplay";
// Base url //
import baseUrl from "../../assets/URL/baseUrl";

const FriendLists = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const res = await fetch(`${baseUrl}users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <WidgetWrapper>
      <Typography color="#000" fontWeight="700" sx={{ marginBottom: "1.5rem" }}>
        Friend Lists
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <FriendsDisplay
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
            subtitle={friend.place}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendLists;
