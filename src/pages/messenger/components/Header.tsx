import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HEADER_LOGO } from 'utils/ImageUtil';
import HeaderStyle from 'assets/styles/HeaderStyle';
import {
  AUTH_CONTENT,
  AUTH_DATE,
  AUTH_IMAGE,
  AUTH_ISLOGGED,
  AUTH_USERID,
  AUTH_USERNAME,
  COMMON_TYPE,
} from 'store/actions/types';
import { LOGIN_ROUTE_URL } from 'constants/constants';

const {
  HeaderContainer,
  WelcomeText,
  LogoImage,
  PointText,
  MenuContainer,
  MenuList,
  ProfileImage,
  MenuListItem,
  UserName,
} = HeaderStyle;

interface headerProps {
  userName: string;
  profileImage: string;
}

export default function Header({ userName, profileImage }: headerProps) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileClick = () => {
    setIsClick((curr) => !curr);
  };

  const handleLogout = () => {
    dispatch({ type: COMMON_TYPE, name: AUTH_ISLOGGED, data: false });
    dispatch({ type: COMMON_TYPE, name: AUTH_USERID, data: '' });
    dispatch({ type: COMMON_TYPE, name: AUTH_USERNAME, data: '' });
    dispatch({ type: COMMON_TYPE, name: AUTH_IMAGE, data: '' });
    dispatch({ type: COMMON_TYPE, name: AUTH_CONTENT, data: '' });
    dispatch({ type: COMMON_TYPE, name: AUTH_DATE, data: '' });
    navigate(LOGIN_ROUTE_URL);
  };
  return (
    <>
      <HeaderContainer>
        <WelcomeText>
          <LogoImage src={HEADER_LOGO} alt="로고 이미지" />
          환영합니다
          <PointText>{userName}</PointText>님
        </WelcomeText>
        <ProfileImage
          src={profileImage}
          alt="프로필 사진"
          onClick={profileClick}
        />
      </HeaderContainer>
      {isClick && (
        <MenuContainer>
          <MenuList>
            <MenuListItem>
              <ProfileImage src={profileImage} alt="프로필 사진" />
              <UserName>{userName}</UserName>
            </MenuListItem>
            <MenuListItem>User Setting</MenuListItem>
            <MenuListItem onClick={handleLogout}>Sign Out</MenuListItem>
          </MenuList>
        </MenuContainer>
      )}
    </>
  );
}
