import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Heading } from '../Heading/Heading';
import { Text } from '../Text/Text';
import { HR } from '../HR/HR';
import { CloseIcon, Modal, ModalContainer, StyledLink } from './AccountsModal.style';

export const AccountsModal = ({ heading, description, onClose }) => {
  return (
    <Modal>
      <ModalContainer>
        <Heading size={1} displayAs={3}>
          {heading}
        </Heading>
        {description && <Text>{description}</Text>}
        <CloseIcon onClick={onClose} />
        <StyledLink to="/transfer-money/money-in/current">
          Current Account
          <div>
            £X
            <FiChevronRight style={{ fontSize: '24px', position: 'relative', top: '1px' }} />
          </div>
        </StyledLink>
        <HR />
        <StyledLink to="/transfer-money/money-in/savings">
          Savings Account
          <div>
            £X
            <FiChevronRight style={{ fontSize: '24px', position: 'relative', top: '1px' }} />
          </div>
        </StyledLink>
      </ModalContainer>
    </Modal>
  );
};
