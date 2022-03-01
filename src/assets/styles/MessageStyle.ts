import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.bgGrayColor};
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 20px;
  cursor: pointer;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNameDateFunction = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  width: 93vw;
`;

const UserNameDate = styled.div``;

const MessageFunction = styled.div``;

const AnswerBtn = styled.button<{ isReply?: boolean }>`
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 12px;
  margin-left: 10px;
  background-color: ${({ theme, isReply }) =>
    isReply ? theme.pointBlueColor : 'none'};
  color: ${({ isReply }) => (isReply ? 'white' : 'black')};
  transition: all 0.2s ease-in-out;
`;

const DeleteBtn = styled(AnswerBtn)``;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const MessageDate = styled.span`
  font-size: 12px;
  margin-left: 10px;
`;

const MessageText = styled.span`
  word-break: break-all;
  width: 88%;
  white-space: pre-line;
  font-size: 14px;
`;

const AreYouAuthor = styled.span`
  margin-left: 3px;
`;

const MessageStyle = {
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
};

export default MessageStyle;
