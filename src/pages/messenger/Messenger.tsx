import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/reducers';
import { useInterval } from 'hooks';
import { MessageContainer, Header, ChatInput } from '../';
import { MessageListProps, replyProps } from '../../utils/InterfaceSet';
import LoadingIndicator from 'components/LoadingIndicator';

interface MessengerProps {
  isLogged: boolean;
  userId: string;
  userName: string;
  profileImage: string;
}

const REPLY = 'reply';
const DELETE = 'delete';

export default function Messenger({
  isLogged,
  userName,
  profileImage,
}: MessengerProps) {
  const [replyMessage, setReplyMessage] = useState<replyProps>();
  const [deleteMessage, setDeleteMessage] = useState<MessageListProps>();
  const [messageList, setMessageList] = useState<Array<MessageListProps>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const latestConversationRef = useRef<HTMLDivElement>(null);

  const userInfo = useSelector((state: RootState) => state.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function scrollToBottom() {
    if (latestConversationRef.current === null) return;
    latestConversationRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  const getData = () => {
    axios
      .get('https://json-server-wanted14.herokuapp.com/messages')
      .then((res) => {
        setMessageList(res.data);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  }, [isLogged]);

  // useInterval(() => scrollToBottom(), 300);

  useEffect(() => {
    if (!userInfo.isLogged) navigate('/login');

    scrollToBottom();
    getData();
    setIsLoading(false);
  }, []);

  function onClick(e: React.MouseEvent<HTMLButtonElement>, type: string) {
    switch (type) {
      case REPLY: {
        const findMessageObject = messageList.find(
          (item) => item.date === e.currentTarget.id
        );
        if (!findMessageObject) return;
        const newObj = {
          userName: findMessageObject?.userName,
          content: findMessageObject?.content,
        };
        setReplyMessage(newObj);
        return;
      }
      case DELETE: {
        const findMessageObject = messageList.find(
          (item) => item.date === e.currentTarget.id
        );
        setDeleteMessage(findMessageObject);
        dispatch({ type: 'open' });
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
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <>
      <Header userName={userName} profileImage={profileImage} />
      <div ref={latestConversationRef}>
        <MessageContainer
          getData={getData}
          data={messageList}
          onClickReply={(e) => onClick(e, REPLY)}
          onClickDelete={(e) => onClick(e, DELETE)}
          deleteData={deleteMessage}
        />
      </div>
      <ChatInput {...chatProps} />
    </>
  );
}
