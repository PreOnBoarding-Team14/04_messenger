import MessageStyle from 'assets/styles/MessageStyle';
import { Modal } from 'components';
import { useSelector } from 'react-redux';
import { MessageListProps, replyProps } from 'utils/InterfaceSet';
import { RootState } from '../../../store/reducers';

const {
  Container,
  ProfileImage,
  MessageWrapper,
  UserNameDateFunction,
  UserNameDate,
  MessageFunction,
  AnswerBtn,
  DeleteBtn,
  UserName,
  MessageDate,
  MessageText,
  AreYouAuthor,
} = MessageStyle;

interface messageComponentProps {
  getData: () => void;
  attr: MessageListProps;
  onClickReply?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteData?: MessageListProps;
  isDelete?: boolean;
  replyMessage?: replyProps;
}

export default function Message({
  getData,
  attr,
  onClickReply,
  onClickDelete,
  deleteData,
  isDelete = false,
  replyMessage,
}: messageComponentProps) {
  const { userId, userName, profileImage, content, date, id } = attr;
  const auth = useSelector((state: RootState) => state.authReducer);
  const isAuthor = userId === auth.userId;
  const showModal = useSelector((state: RootState) => state.switReducer);

  return (
    <Container>
      <ProfileImage src={profileImage} />
      <MessageWrapper>
        <UserNameDateFunction>
          <UserNameDate>
            <UserName>
              {userName}
              {isAuthor && <AreYouAuthor>*</AreYouAuthor>}
            </UserName>
            <MessageDate>{date}</MessageDate>
          </UserNameDate>
          {/* 모달창에는 표시 X */}
          <MessageFunction>
            {isAuthor && !isDelete && (
              <DeleteBtn id={id} onClick={onClickDelete}>
                삭제하기
              </DeleteBtn>
            )}
            {!isDelete && (
              <AnswerBtn
                isReply={replyMessage?.id === id && replyMessage.isReply}
                id={id}
                onClick={onClickReply}
              >
                답장하기
              </AnswerBtn>
            )}
          </MessageFunction>
        </UserNameDateFunction>
        <MessageText>
          {isDelete && content.length > 9
            ? `${content.slice(0, 10)}...`
            : content}
        </MessageText>
      </MessageWrapper>
      {showModal && deleteData && (
        <Modal
          getData={getData}
          key={id}
          isShow={deleteData?.id === id}
          header="메세지를 삭제하시겠습니까?"
          content={deleteData}
        />
      )}
    </Container>
  );
}
