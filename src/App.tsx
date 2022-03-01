import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducers/';
import Login from 'pages/login/Login';
import Messenger from 'pages/messenger/Messenger';
import { LOGIN_ROUTE_URL } from 'constants/constants';

export default function App() {
  const auth = useSelector((state: RootState) => state.authReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Messenger
              isLogged={auth.isLogged}
              userId={auth.userId}
              userName={auth.userName}
              profileImage={auth.profileImage}
            />
          }
        />
        <Route path={LOGIN_ROUTE_URL} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
