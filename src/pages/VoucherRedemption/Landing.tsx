import React from 'react';
import styled from 'styled-components';
import { Divider, Voucher, Bold } from './styles';
import Logo from '../../components/Logos/image/LogoTextDown.png';
import MoreInfo from './MoreInfo';
import {
  useVoucherState,
  useVoucherDispatch,
} from '../../utilities/hooks/VoucherContext/context';
import { SET_VIEW } from '../../utilities/hooks/VoucherContext/constants';

interface Props {}
interface ButtonProps {
  color?: String;
}
const LandingCard = (props: Props) => {
  const { voucher } = useVoucherState();
  const dispatch = useVoucherDispatch();

  const setView = (e) => {
    dispatch({ type: SET_VIEW, payload: 1 });
  };

  return (
    <Container>
      <CardContainer>
        <VoucherContent>
          <SubText>
            <SupportingText>Your available balance</SupportingText>
            <MoreInfo />
          </SubText>
          <Balance>${(voucher.amount / 100).toFixed(2)}</Balance>
          <Voucher>
            Voucher Code: <Bold>{voucher.seller_gift_card_id}</Bold>
          </Voucher>
          <br />
        </VoucherContent>
        <Divider />
        <Button onClick={setView}>Click to begin redeeming your voucher</Button>
        <br />
      </CardContainer>
      <br />
      <Button color="#ab192e">{voucher.locations[0]}</Button>;
      <FooterContainer>
        <Image src={Logo} />
      </FooterContainer>
    </Container>
  );
};

export default LandingCard;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const CardContainer = styled.div`
  position: relative;
  width: 307px;
  margin: 0 auto;
  height: 342px;
  background-color: #ab192e;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-between;
`;
const VoucherContent = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: -15px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding-top: 5px;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ab192e;
`;
const SubText = styled.div`
  font-size: 16px;
  line-height: 22px;
  display: flex;
  flex-direction: row;
  color: white;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
`;
const SupportingText = styled.span`
  z-index: 100 !important;
`;
const Button = styled.div`
  cursor: pointer;
  ${(props: ButtonProps) => props.color && `color: ${props.color}`}
  font-size: 13px;
  line-height: 18px;
  text-align: center;
`;
const Balance = styled.div`
  z-index: 0 !important;
  font-weight: 600;
  font-size: 50px;
  line-height: 68px;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`;
const Image = styled.img`
  width: 75px;
`;
const FooterContainer = styled.div`
  width: 100%;
  margin: 12px auto;
  background-color: transparent;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
