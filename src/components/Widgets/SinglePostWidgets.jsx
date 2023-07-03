import React from "react";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
// Components //
import FlexBetween from "../../components/Styles/FlexBetween.jsx";
import FriendsDisplay from "../../components/Styles/FriendsDisplay.jsx";
import WidgetWrapper from "../../components/Styles/WidgetWrapper.jsx";
// Base Url //
import baseUrl from "../../assets/URL/baseUrl.js";

const SinglePostWidgets = ({
  postId,
  userPostId,
  name,
  location,
  description,
  picturePath,
  userPicturePath,
  likes,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  //   like add count //
  const patchLike = async () => {
    const res = await fetch(`${baseUrl}posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };

  console.log(picturePath, "picturePath");

  return (
    <WidgetWrapper margin="2rem 0">
      <FriendsDisplay
        friendId={userPostId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color="#000" sx={{ marginTop: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${baseUrl}assets/${picturePath}`}
        />
      )}
      <FlexBetween marginTop="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "#FF6666" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default SinglePostWidgets;
