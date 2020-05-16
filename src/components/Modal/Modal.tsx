import React from 'react';
import classnames from 'classnames';
import { v4 as uuid } from 'uuid';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import { CLOSE_MODAL } from '../../utilities/hooks/ModalPaymentContext/constants';
import ModalAmount from '../ModalAmount';
import { SquareModal } from '../ModalPayment';
import ModalConfirmation from '../ModalConfirmation';
import styles from './styles.module.scss';

export interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
}

const idempotencyKey = uuid();

export const Modal = (props: Props) => {
  const { modalView } = useModalPaymentState();
  const dispatch = useModalPaymentDispatch();

  const closeModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: CLOSE_MODAL, payload: undefined });
  };

  return (
    <div
      id="donation-form"
      className={classnames(styles.donationsContainer, 'modalForm--form')}
      style={{ display: modalView > -1 ? 'block' : 'none' }}
    >
      <button className={'closeButton--close'} onClick={closeModal}>
        ×
      </button>
      {modalView === 0 && <ModalAmount {...props} />}
      {modalView === 1 && (
        <SquareModal {...props} idempotencyKey={idempotencyKey} />
      )}
      {modalView === 2 && <ModalConfirmation {...props} />}
    </div>
  );
};

export default Modal;
