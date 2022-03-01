import Message from '../components/Message';
import ChatInputStyle from 'assets/styles/ChatInputStyle';
import { MessageListProps, replyProps } from 'utils/InterfaceSet';

const { EmptyBox } = ChatInputStyle;

interface MessageContainerProps {
  getData: () => void;
  data: MessageListProps[];
  onClickReply: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteData?: MessageListProps;
  replyMessage?: replyProps;
}

export default function MessageContainer({
  getData,
  data,
  onClickReply,
  onClickDelete,
  deleteData,
  replyMessage,
}: MessageContainerProps) {
  const messageProps = {
    getData,
    replyMessage,
    onClickReply,
    onClickDelete,
    deleteData,
  };

  return (
    <>
      {data.map((item) => (
        <Message {...messageProps} key={item.id} attr={item} />
      ))}
      <EmptyBox />
    </>
  );
}
