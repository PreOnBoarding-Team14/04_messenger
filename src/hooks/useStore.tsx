import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

export default function useStore() {
  const { store } = useContext(ReactReduxContext);
  return store;
}
