import React, { useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers/';
import { HttpUtil } from 'utils';
import { userInfoProps } from '../../utils/InterfaceSet';
import LOGO from '../../assets/images/logo.svg';
import LoginStyle from 'assets/styles/LoginStyle';

const {
  Container,
  LogoBox,
  InputContainer,
  Input,
  BtnContainer,
  ErrorBox,
  LoginBtn,
  // SignupBtn,
} = LoginStyle;

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ id: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [userInfo, setUserInfo] = useState<userInfoProps>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) return;

    dispatch({ type: 'common', name: 'isLogged', data: true });
    dispatch({ type: 'common', name: 'userId', data: userInfo.id });
    dispatch({ type: 'common', name: 'userName', data: userInfo.name });
    dispatch({ type: 'common', name: 'profileImage', data: userInfo.img });
    navigate('/');
  }, [userInfo]);

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
      setErrorMsg('');
    };

  const handleLogin = async () => {
    const res = await HttpUtil.requestApi({
      url: '/login',
      method: 'POST',
      params: {
        id: loginInfo.id,
        password: loginInfo.password,
      },
    });

    if (!res.data) {
      setErrorMsg('아이디와 비밀번호를 확인해주세요');
      setUserInfo(undefined);
    } else {
      setUserInfo(res.data.data);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container>
      <LogoBox src={LOGO} />
      <InputContainer>
        <Input
          placeholder="ID"
          type="id"
          onChange={handleInputValue('id')}
          onKeyPress={handleKeyPress}
        />
        <Input
          placeholder="PW"
          type="password"
          onChange={handleInputValue('password')}
          onKeyPress={handleKeyPress}
        />
        <ErrorBox>{errorMsg}</ErrorBox>
      </InputContainer>
      <BtnContainer>
        <LoginBtn
          hasInput={!!loginInfo.id.length && !!loginInfo.password.length}
          onClick={handleLogin}
        >
          로그인
        </LoginBtn>
      </BtnContainer>
    </Container>
  );
}
