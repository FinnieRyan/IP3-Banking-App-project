import styled from 'styled-components';
import { FaCircleInfo } from 'react-icons/fa6';

export const AccountDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const InfoIcon = styled(FaCircleInfo)`
  position: absolute;
  font-size: 24px;
  top: 24px;
  right: 24px;
  color: ${(props) => props.theme.colors.grey};
  cursor: pointer;
`;
