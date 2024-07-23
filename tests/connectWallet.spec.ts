import { testWithSynpress } from '@synthetixio/synpress-core';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress';

import basicSetup from './wallet-setup/basic.setup';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test('should connect wallet to LI.FI Scan', async ({
  context,
  page,
  extensionId,
}) => {
  const metamask = new MetaMask(
    context,
    page,
    basicSetup.walletPassword,
    extensionId,
  );
  const connectWalletButton = page.locator('#connect-wallet-button');
  const connectedWalletButton = page.locator('#wallet-digest-button');
  await connectWalletButton.click();
  await page.locator('(//img[@alt="io.metamask-wallet-logo"])[1]').click();
  await page.locator('xpath=(//button[@type="button"])[2]').click();
  await metamask.connectToDapp(['Account 1']);
  await expect(connectedWalletButton).not.toHaveText('Connect');
});
