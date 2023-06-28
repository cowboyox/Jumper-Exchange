import React from 'react';
import {
  MultisigConnectedAlertContainer,
  MultisigConnectedAlertIconContainer,
  MultisigConnectedAlertIcon,
} from './MultisigConnectedAlert.style';
import { Modal, Typography } from '@mui/material';
import { ButtonPrimary, useTranslation } from '@transferto/shared';

export const MultisigConnectedAlert: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const i18Path = 'multisig.connected';

  const { t: translate } = useTranslation();

  return (
    <Modal open={open} onClose={null}>
      <MultisigConnectedAlertContainer>
        <MultisigConnectedAlertIconContainer>
          <MultisigConnectedAlertIcon />
        </MultisigConnectedAlertIconContainer>
        <Typography
          fontWeight={700}
          textAlign={'center'}
          marginY={4}
          style={{
            fontSize: '1.125rem',
          }}
        >
          {translate(`${i18Path}.title`)}
        </Typography>
        <Typography fontSize={'1.125 rem'} marginY={4}>
          {translate(`${i18Path}.description`)}
        </Typography>
        <ButtonPrimary
          onClick={onClose}
          style={{
            width: '100%',
          }}
        >
          {translate(`multisig.button.cta`)}
        </ButtonPrimary>
      </MultisigConnectedAlertContainer>
    </Modal>
  );
};
