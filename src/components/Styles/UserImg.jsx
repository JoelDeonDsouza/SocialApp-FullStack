import { Box } from "@mui/material";
// URL //
import baseUrl from "../../assets/URL/baseUrl.js";

const UserImg = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`${baseUrl}assets/${image}`}
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="proImg"
      />
    </Box>
  );
};

export default UserImg;
