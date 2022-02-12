import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/reducers';
import { MessageContainer, Header, ChatInput } from '../';
import { MessageListProps, replyProps } from '../../utils/InterfaceSet';
import LoadingIndicator from 'components/LoadingIndicator';
import axios from 'axios';

interface MessengerProps {
  userId: string;
  userName: string;
  profileImage: string;
}

const REPLY = 'reply';
const DELETE = 'delete';

export default function Messenger({ userName, profileImage }: MessengerProps) {
  const latestConversationRef = useRef<HTMLDivElement>(null);
  const [replyMessage, setReplyMessage] = useState<replyProps>();
  const [deleteMessage, setDeleteMessage] = useState<MessageListProps>();
  const [messageList, setMessageList] = useState<Array<MessageListProps>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get('https://json-server-wanted14.herokuapp.com/messages')
      .then((res) => {
        setMessageList(res.data);
      });
  };

  const userInfo = useSelector((state: RootState) => state.authReducer);

  const scrollToBottom = () => {
    if (latestConversationRef.current === null) return;
    latestConversationRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  useEffect(() => {
    if (!userInfo.isLogged) navigate('/login');
    getData();
    scrollToBottom();
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
    getData,
    scrollToBottom,
    replyMessage,
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <div ref={latestConversationRef}>
      <Header userName={userName} profileImage={profileImage} />
      <MessageContainer
        getData={getData}
        data={messageList}
        onClickReply={(e) => onClick(e, REPLY)}
        onClickDelete={(e) => onClick(e, DELETE)}
        deleteData={deleteMessage}
      />
      <ChatInput {...chatProps} />
    </div>
  );
}
