import { viewports } from '@lifi/style'
import { useMedia } from 'use-media'

export const useIsDesktopFullHD = () => useMedia({ minWidth: viewports.minDesktopFullHd })
