import { useState, useEffect, RefObject } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';
import ChatInputStyle from 'assets/styles/ChatInputStyle';
import 'assets/images/sendMessage.png';
import { SEND_MESSAGE_ICON } from 'utils/ImageUtil';
import { RootState } from 'store/reducers';
import { useSelector } from 'react-redux';
import { MessageListProps, replyProps } from 'utils/InterfaceSet';
import { DATE_FORMAT, LOCATION, MESSEAGE_URL } from 'constants/constants';

const { ChatInputContainer, InputWrapper, TextArea, SendButton, SendIcon } =
  ChatInputStyle;

interface ChatInputProps {
  getData: () => void;
  replyMessage?: replyProps;
  scrollToBottom: () => void;
  inputFocusRef: RefObject<HTMLTextAreaElement>;
}

export default function ChatInput({
  getData,
  replyMessage,
  scrollToBottom,
  inputFocusRef,
}: ChatInputProps) {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [messageText, setMessageText] = useState(String);
  const WriteMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setButtonDisabled(false);
    setMessageText(e.target.value);
    if (e.target.value === '') {
      setButtonDisabled(true);
    }
  };

  const authInfo = useSelector((state: RootState) => state.authReducer);

  const sendMessage = () => {
    const moment = require('moment-timezone');
    if (replyMessage) {
      replyMessage.isReply = false;
    }
    if (messageText) {
      const chatInfo: MessageListProps = {
        id: v4(),
        userId: authInfo.userId,
        userName: authInfo.userName,
        profileImage: authInfo.profileImage,
        content: messageText,
        date: moment().tz(LOCATION).format(DATE_FORMAT),
      };
      axios.post(MESSEAGE_URL, chatInfo).then(() => {
        getData();
        setTimeout(() => {
          scrollToBottom();
        }, 230);
      });

      setMessageText('');
      setButtonDisabled(true);
    }
  };

  const pressSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      sendMessage();
      e.preventDefault();
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!replyMessage) return;
    if (replyMessage.content !== '') {
      setButtonDisabled(false);
      if (!replyMessage.isReply) {
        return setMessageText('');
      }
      const answerFormat =
        `사용자 이름:${replyMessage.userName}` +
        '\n' +
        `채팅 내용:${replyMessage.content}` +
        `\n` +
        `회신:`;
      setMessageText(() => {
        if (messageText.includes('회신') && replyMessage.isReply) {
          return answerFormat.trim();
        } else {
          return `${messageText}\n${answerFormat}`;
        }
      });
    }
  }, [replyMessage]);

  return (
    <ChatInputContainer>
      <InputWrapper method="post" onSubmit={submit}>
        <TextArea
          ref={inputFocusRef}
          onChange={WriteMessage}
          value={messageText}
          onKeyPress={pressSendMessage}
        />
        <SendButton onClick={sendMessage} disabled={buttonDisabled}>
          <SendIcon
            alt="전송 아이콘"
            src={SEND_MESSAGE_ICON}
            isDisabled={buttonDisabled}
          />
        </SendButton>
      </InputWrapper>
    </ChatInputContainer>
  );
}
