import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../store/reducers';
import { MessageContainer, Header, ChatInput } from '../';
import { MessageListProps, replyProps } from '../../utils/InterfaceSet';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  DELETE,
  LOGIN_ROUTE_URL,
  MESSEAGE_URL,
  REPLY,
} from 'constants/constants';
import { OPEN_TYPE } from 'store/actions/types';

interface MessengerProps {
  isLogged: boolean;
  userId: string;
  userName: string;
  profileImage: string;
}

export default function Messenger({
  isLogged,
  userName,
  profileImage,
}: MessengerProps) {
  const [replyMessage, setReplyMessage] = useState<replyProps>();
  const [deleteMessage, setDeleteMessage] = useState<MessageListProps>();
  const [messageList, setMessageList] = useState<Array<MessageListProps>>([]);
  const [isReply, setIsReply] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const latestConversationRef = useRef<HTMLDivElement>(null);
  const inputFocusRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (latestConversationRef.current === null) return;
    latestConversationRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  }, [isLogged]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = () => {
    axios.get(MESSEAGE_URL).then((res) => {
      setMessageList(res.data);
    });
  };

  const userInfo = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {});

  useEffect(() => {
    if (!userInfo.isLogged) navigate(LOGIN_ROUTE_URL);
    scrollToBottom();
    getData();
    setIsLoading(false);
  }, [userInfo.isLogged, navigate]);

  function onClick(e: React.MouseEvent<HTMLButtonElement>, type: string) {
    switch (type) {
      case REPLY: {
        const findMessageObject = messageList.find(
          (item) => item.id === e.currentTarget.id
        );
        if (!findMessageObject) return;
        if (replyMessage?.content === findMessageObject?.content) {
          setIsReply((prev) => !prev);
        } else {
          setIsReply(true);
        }
        const newObj = {
          userName: findMessageObject?.userName,
          content: findMessageObject?.content,
          isReply: isReply,
          id: findMessageObject.id,
        };
        setReplyMessage(newObj);
        if (!inputFocusRef.current) return;
        inputFocusRef.current.focus();
        return;
      }
      case DELETE: {
        const findMessageObject = messageList.find(
          (item) => item.id === e.currentTarget.id
        );
        setDeleteMessage(findMessageObject);
        dispatch({ type: OPEN_TYPE });

        return;
      }
      default:
        break;
    }
  }

  const chatProps = {
    scrollToBottom,
    getData,
    replyMessage,
    inputFocusRef,
  };

  const messageContainerProps = {
    getData,
    data: messageList,
    replyMessage,
    onClickReply: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      onClick(e, REPLY),
    onClickDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
      onClick(e, DELETE),
    deleteData: deleteMessage,
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <>
      <Header userName={userName} profileImage={profileImage} />
      <div ref={latestConversationRef}>
        <MessageContainer {...messageContainerProps} />
      </div>
      <ChatInput {...chatProps} />
    </>
  );
}
