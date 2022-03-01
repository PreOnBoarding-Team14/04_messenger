import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  border-bottom: 1px solid lightgray;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const WelcomeText = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;

const LogoImage = styled.img`
  width: 85px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
`;

const PointText = styled.span`
  color: ${({ theme }) => theme.pointColor};
  margin-left: 5px;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  width: 250px;
  height: 160px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 1px 1px ${({ theme }) => theme.rgba10};
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 100;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
`;

const MenuListItem = styled.li`
  cursor: pointer;
  &:first-child {
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
  }
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;

const HeaderStyle = {
  HeaderContainer,
  WelcomeText,
  LogoImage,
  PointText,
  MenuContainer,
  MenuList,
  ProfileImage,
  MenuListItem,
  UserName,
};

export default HeaderStyle;
