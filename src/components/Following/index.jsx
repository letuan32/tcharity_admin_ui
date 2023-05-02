import {
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";

import {useEffect, useState} from 'react';


import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useTheme, CircularProgress  } from "@mui/material";
import FlexBetween from '../CustomStyledComponents/FlexBetween';
import UserAvatar from '../CustomStyledComponents/UserAvatar';


const Following = ({
  followingId,
  name='',
  subtitle='',
  isAuthor,
  userProfilePhotoUrl}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)


    const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "https://localhost:7010/" : process.env.REACT_APP_API_GATEWAY
    const getUser = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch( `${serverUrl}identity/user?userEmail=${followingId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });

        const responseData = await response.json();
        setUser(responseData.posts)
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        getUser();
    }, []);

    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserAvatar image={userProfilePhotoUrl} size="55px" />
          <Box
            onClick={() => {
              // navigate(`/profile${name !== username ? `/${  name}` : ''}`);
              navigate(0);
            }}
          >
            <Typography
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Tuan Le
            </Typography>
          </Box>
    </FlexBetween>
      </FlexBetween>

    )
}

export default Following