import { COMMON_TYPE } from 'store/actions/types';

interface AuthReducerProps {
  type: string;
  name: string;
  data: object;
}

const initState = {
  isLogged: false,
  userId: '',
  userName: '',
  profileImage: '',
  content: '',
  date: '',
};

export default function authReducer(
  state = initState,
  action: AuthReducerProps
) {
  switch (action.type) {
    case COMMON_TYPE:
      return { ...state, [action.name]: action.data };
    default:
      return state;
  }
}
