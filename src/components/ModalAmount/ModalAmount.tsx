import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {
  useModalPaymentState,
  useModalPaymentDispatch,
} from '../../utilities/hooks/ModalPaymentContext/context';
import {
  SET_MODAL_VIEW,
  SET_AMOUNT,
  CLOSE_MODAL,
} from '../../utilities/hooks/ModalPaymentContext/constants';

interface Props {
  purchaseType: string;
  sellerId: string;
  sellerName: string;
}

export const Modal = (props: Props) => {
  const { amount } = useModalPaymentState();
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const dispatch = useModalPaymentDispatch();

  const handleAmount = (value: number, customAmount: boolean) => {
    setIsCustomAmount(customAmount);
    dispatch({ type: SET_AMOUNT, payload: value });
  };

  const openModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: SET_MODAL_VIEW, payload: 1 });
  };

  const closeModal = (e: any) => {
    e.preventDefault();
    dispatch({ type: CLOSE_MODAL, payload: undefined });
  };

  return (
    <form
      id="donation-form"
      className={classnames(styles.donationsContainer, 'modalForm--form')}
    >
      <button className={'closeButton--close'} onClick={closeModal}>
        ×
      </button>

      <h2>{props.sellerName}</h2>
      <p>Please select an amount or enter any amount</p>

      <div className={styles.amountContainer}>
        <label htmlFor="select-amount">Select an amount </label>
        <br />
        <div className={styles.selectAmtContainer}>
          <button
            type="button"
            className={'modalButton--outlined'}
            onClick={(e) => handleAmount(10, false)}
          >
            $10
          </button>
          <button
            type="button"
            className={'modalButton--outlined'}
            onClick={(e) => handleAmount(25, false)}
          >
            $25
          </button>
          <button
            type="button"
            className={'modalButton--outlined'}
            onClick={(e) => handleAmount(50, false)}
          >
            $50
          </button>
          <button
            type="button"
            className={'modalButton--outlined'}
            onClick={(e) => handleAmount(100, false)}
          >
            $100
          </button>
        </div>
        <label htmlFor="custom-amount">Or enter an amount </label>
        <br />
        <input
          name="custom-amount"
          type="number"
          onFocus={(e) => handleAmount(0, true)}
          className={classnames(styles.customAmt, 'modalInput--input')}
          onChange={(e) => handleAmount(parseInt(e.target.value), true)}
          value={isCustomAmount ? amount : ''}
          placeholder="$"
          min="6"
        />
        {amount <= 5 && isCustomAmount && (
          <div className={styles.errorMessage}>
            $5 is our minimum gift card amount
          </div>
        )}
      </div>

      <button
        type="button"
        className={classnames(styles.nextBtn, 'modalButton--filled')}
        onClick={openModal}
        disabled={amount <= 5}
      >
        Next
      </button>
    </form>
  );
};

export default Modal;
