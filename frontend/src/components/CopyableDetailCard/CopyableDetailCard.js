// React and PropTypes
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// Components
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

// Styles
import {
  CopyConfirmation,
  CopyIcon,
  DetailsContainer,
} from './CopyableDetailCard.style';

export const CopyableDetailCard = ({
  label,
  value,
  showCopyButton = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  // Copy to clipboard function
  const copyToClipboard = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    } else if (document.execCommand) {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } else {
      console.error('Copy to clipboard failed');
    }
    setIsCopied(true);
  }, [value]);

  // Clear the copied message after 2 seconds
  useEffect(() => {
    let timeout;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <Card row>
      <Text>{label}</Text>
      <DetailsContainer>
        <Text>{value}</Text>
        {showCopyButton && (
          <CopyIcon onClick={copyToClipboard} aria-label="Copy to clipboard" />
        )}
        {isCopied && (
          <CopyConfirmation>
            Copied <strong>{value}</strong>
          </CopyConfirmation>
        )}
      </DetailsContainer>
    </Card>
  );
};

CopyableDetailCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  showCopyButton: PropTypes.bool,
};
