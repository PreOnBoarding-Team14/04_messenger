import { CLOSE_TYPE, OPEN_TYPE } from 'store/actions/types';

interface switReducerProps {
  type: string;
  name: string;
  data: object;
}

const initialState = false;

export default function switReducer(
  state = initialState,
  action: switReducerProps
) {
  switch (action.type) {
    case OPEN_TYPE:
      return true;
    case CLOSE_TYPE:
      return false;
    default:
      return state;
  }
}
