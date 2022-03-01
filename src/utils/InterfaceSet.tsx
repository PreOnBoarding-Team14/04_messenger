export interface MessageListProps {
  id: string;
  userId: string;
  userName: string;
  profileImage: string;
  content: string;
  date: string;
}

export interface userInfoProps {
  id: string;
  name: string;
  password: string;
  img: string;
}

export interface requestParamsProps {
  url: string;
  method: string;
  params?: object;
}

export interface responseProps {
  data: Array<MessageListProps>;
  msg: string;
}

// Array<MessageListProps> | Array<userInfoProps>

export interface replyProps {
  userName: string;
  content: string;
  isReply: boolean;
  id: string;
}
