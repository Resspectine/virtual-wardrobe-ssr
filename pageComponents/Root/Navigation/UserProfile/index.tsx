import { Avatar, Menu, MenuItem } from '@mui/material';
import { FC } from 'react';

import { useUserProfile } from './hooks';
import { UserProfileButton, UserProfileWrapper } from './styled';

const UserProfile: FC = () => {
  const { open, anchorEl, menuItems, handleClick, handleClose, userProfileUrl } = useUserProfile();

  return (
    <UserProfileWrapper>
      <UserProfileButton onClick={handleClick}>
        <Avatar src={userProfileUrl} alt="avatar" />
      </UserProfileButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map(({ text, onClick }, index) => (
          <MenuItem key={index} onClick={onClick}>
            {text}
          </MenuItem>
        ))}
      </Menu>
    </UserProfileWrapper>
  );
};

export default UserProfile;
