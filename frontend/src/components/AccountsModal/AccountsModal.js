// React and PropTypes
import React from 'react';
import PropTypes from 'prop-types';

// Icons
import { FiChevronRight } from 'react-icons/fi';

// Components and Styles
import { Heading } from '../Heading/Heading';
import { Text } from '../Text/Text';
import { HR } from '../HR/HR';
import {
  CloseIcon,
  Modal,
  ModalContainer,
  StyledLink,
} from './AccountsModal.style';

export const AccountsModal = ({ heading, description, onClose, accounts }) => {
  return (
    <Modal>
      <ModalContainer>
        <Heading size={1} displayAs={3}>
          {heading}
        </Heading>
        {description && <Text>{description}</Text>}
        <CloseIcon onClick={onClose} />
        {accounts.map((account, index) => (
          <>
            <StyledLink to={`/transfer-money/money-in/${account._id}`}>
              {account.accountType}
              <div>
                £{account.balance}
                <FiChevronRight
                  style={{ fontSize: '24px', position: 'relative', top: '1px' }}
                />
              </div>
            </StyledLink>
            {index < accounts.length - 1 && <HR />}
          </>
        ))}
      </ModalContainer>
    </Modal>
  );
};

AccountsModal.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      accountType: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })
  ).isRequired,
};
