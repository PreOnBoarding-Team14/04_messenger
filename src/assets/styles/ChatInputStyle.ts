import styled from 'styled-components';

const ChatInputContainer = styled.div`
  position: fixed;
  z-index: 3000;
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.bgGrayColor};
  left: 0;
  right: 0;
  bottom: 0;
`;

const InputWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border: 1px solid gray;
  border-radius: 4px;
  background: white;
`;

const TextArea = styled.textarea`
  margin-left: 10px;
  resize: none;
  width: 100%;
  height: 80%;
  border: none;
  font-size: 15px;
  outline: none;
`;

const SendButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;

  width: 50px;
  height: 50px;
`;

const SendIcon = styled.img<{ isDisabled: boolean }>`
  width: 30px;
  height: 30px;
  filter: ${(props) => (props.isDisabled ? 'invert(50%)' : '')};
`;

const EmptyBox = styled.div`
  bottom: 0;
  height: 120px;
`;

const ChatInputStyle = {
  InputWrapper,
  TextArea,
  SendButton,
  SendIcon,
  ChatInputContainer,
  EmptyBox,
};

export default ChatInputStyle;
