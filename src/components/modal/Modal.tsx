import { useDispatch } from 'react-redux';
import axios from 'axios';
import ModalStyle from '../../assets/styles/ModalStyle';
import Message from 'pages/messenger/components/Message';
import { MessageListProps } from 'utils/InterfaceSet';
import { CLOSE_TYPE } from 'store/actions/types';
import { MESSEAGE_URL } from 'constants/constants';

const {
  ModalOverlay,
  ModalBox,
  ModalTitleBox,
  ModalTitle,
  UserWarning,
  ModalClose,
  ModalContent,
  UserSelectionBox,
  UserCancle,
  UserDelete,
} = ModalStyle;

interface ModalProps {
  getData: () => void;
  isShow: boolean;
  header: string;
  content: MessageListProps;
}

export default function Modal(attr: ModalProps) {
  const { isShow, header, content, getData } = attr;

  const dispatch = useDispatch();

  const onDelete = () => {
    axios.delete(`${MESSEAGE_URL}/${content.id}`).then(() => {
      dispatch({ type: CLOSE_TYPE });
      getData();
    });
  };

  function closeModal() {
    dispatch({ type: CLOSE_TYPE });
  }

  return (
    <ModalOverlay isShow={isShow}>
      <ModalBox>
        <ModalTitleBox>
          <ModalTitle>{header}</ModalTitle>
          <ModalClose className="close" onClick={closeModal}>
            X
          </ModalClose>
        </ModalTitleBox>
        <ModalContent>
          <UserWarning>
            이 메시지를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.
          </UserWarning>
          <Message getData={getData} attr={content} isDelete={true} />
        </ModalContent>
        <UserSelectionBox>
          <UserCancle className="close" onClick={closeModal}>
            취소
          </UserCancle>
          <UserDelete onClick={onDelete}>삭제</UserDelete>
        </UserSelectionBox>
      </ModalBox>
    </ModalOverlay>
  );
}
