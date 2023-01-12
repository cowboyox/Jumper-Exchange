import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import {
  ConnectedMenuItems,
  ConnectedSubMenuChains,
  SubMenuKeys,
} from '../../../const';
import { useMenu } from '../../../providers/MenuProvider';
import { MenuItemComponent, NavbarMenu, SubMenuComponent } from '../index';
interface NavbarMenuProps {
  anchorRef: any; // TODO: Replace this any with the correct type
  handleClose: (event: MouseEvent | TouchEvent) => void;
  isSuccess: boolean;
}
const ConnectedMenu = ({ handleClose, anchorRef }: NavbarMenuProps) => {
  const i18Path = 'navbar.walletMenu.';
  const { t: translate } = useTranslation();
  const theme = useTheme();
  const menu = useMenu();
  const _connectedMenuItems = ConnectedMenuItems();
  const _connectedSubMenuChains = ConnectedSubMenuChains();

  return !!menu.openNavbarConnectedMenu ? ( //todo, ON ???
    <NavbarMenu
      handleClose={handleClose}
      anchorRef={anchorRef}
      open={menu.openNavbarConnectedMenu}
      isScrollable={menu.openNavbarSubMenu === SubMenuKeys.chains}
      setOpen={menu.onOpenNavbarConnectedMenu}
      isOpenSubMenu={menu.openNavbarSubMenu !== SubMenuKeys.none}
    >
      {_connectedMenuItems.map((el, index) => (
        <MenuItemComponent
          key={`${el.label}-${index}`}
          label={el.label}
          prefixIcon={el.prefixIcon}
          textColor={el.textColor}
          showMoreIcon={el.showMoreIcon}
          bgColor={el.bgColor}
          triggerSubMenu={el.triggerSubMenu}
          showButton={el.showButton}
          suffixIcon={el.suffixIcon}
          onClick={el.onClick}
          open={menu.openNavbarConnectedMenu}
          isOpenSubMenu={menu.openNavbarSubMenu === SubMenuKeys.none}
          setOpenSubMenu={menu.onOpenNavbarSubMenu}
        />
      ))}

      <SubMenuComponent
        label={`${translate(`${i18Path}chains`)}`}
        isSubMenu={true}
        isScrollable={true}
        triggerSubMenu={SubMenuKeys.chains}
        open={menu.openNavbarConnectedMenu}
        isOpenSubMenu={menu.openNavbarSubMenu !== SubMenuKeys.none}
        setOpenSubMenu={menu.onOpenNavbarSubMenu}
        subMenuList={_connectedSubMenuChains}
      />
    </NavbarMenu>
  ) : null;
};

export default ConnectedMenu;
