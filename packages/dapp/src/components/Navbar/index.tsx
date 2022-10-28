import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link as MUILink } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { WalletManagementButtons } from '@transferto/shared';

import {
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useWallet } from '../../providers/WalletProvider';
import {
  NavbarContainer,
  NavbarDropdownButton,
  NavbarLink,
  NavbarLinkContainer,
  NavbarLinkText,
  NavbarManagement,
} from './Navbar.styled';
// TODO: @adrian unable to import the svgs. error with loaders
const JumperLogo = (props) => (
  <svg
    width={128}
    height={48}
    viewBox="0 0 128 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="M54 14C54 13.4477 54.4477 13 55 13H57V22H63V13H65C65.5523 13 66 13.4477 66 14V24C66 24.5523 65.5523 25 65 25H55C54.4477 25 54 24.5523 54 24V14Z"
      fill="#31007A"
    />
    <path
      d="M80 14C80 13.4477 79.5523 13 79 13H69C68.4477 13 68 13.4477 68 14V24C68 24.5523 68.4477 25 69 25H71L71 16L72.5 16L72.5 25H75.5L75.5 16L77 16L77 25H79C79.5523 25 80 24.5523 80 24V14Z"
      fill="#31007A"
    />
    <path d="M49 13H51C51.5523 13 52 13.4477 52 14V16H49V13Z" fill="#8700B8" />
    <path
      d="M52 18H49V22H40V24C40 24.5523 40.4477 25 41 25H51C51.5523 25 52 24.5523 52 24V18Z"
      fill="#31007A"
    />
    <path
      d="M82 20.5H85V25H83C82.4477 25 82 24.5523 82 24V20.5Z"
      fill="#31007A"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M83 13C82.4477 13 82 13.4477 82 14V22H91C92.6569 22 94 20.6569 94 19V16C94 14.3431 92.6569 13 91 13H83ZM90 16H85V19H90C90.5523 19 91 18.5523 91 18V17C91 16.4477 90.5523 16 90 16Z"
      fill="#31007A"
    />
    <path
      d="M110 20H113L113 16L122 16L122 14C122 13.4477 121.552 13 121 13L111 13C110.448 13 110 13.4477 110 14L110 20Z"
      fill="#31007A"
    />
    <path
      d="M113 25L111 25C110.448 25 110 24.5523 110 24L110 22L113 22L113 25Z"
      fill="#8700B8"
    />
    <path
      d="M99 22V20H105V18L99 18L99 16L108 16V14C108 13.4477 107.552 13 107 13H97C96.931 13 96.8636 13.007 96.7985 13.0203C96.3428 13.1136 96 13.5168 96 14V24C96 24.5523 96.4477 25 97 25H107C107.552 25 108 24.5523 108 24V22H99Z"
      fill="#31007A"
    />
    <path
      d="M22.1783 24L12.4556 33.7227L15.1072 36.3744C16.0836 37.3507 17.6665 37.3507 18.6428 36.3744L29.2494 25.7678C30.2257 24.7915 30.2257 23.2085 29.2494 22.2322L23.0622 16.045L18.6428 20.4645L22.1783 24Z"
      fill="#31007A"
    />
    <path
      d="M12.4556 14.2773L15.1072 11.6257C16.0835 10.6494 17.6665 10.6494 18.6428 11.6257L21.2944 14.2773L16.875 18.6967L12.4556 14.2773Z"
      fill="#8700B8"
    />
    <path
      d="M39.7045 35V29.1818H43.2159V29.8068H40.4091V31.7727H43.0341V32.3977H40.4091V34.375H43.2614V35H39.7045ZM44.8267 29.1818L46.3267 31.6023H46.3722L47.8722 29.1818H48.7017L46.8722 32.0909L48.7017 35H47.8722L46.3722 32.625H46.3267L44.8267 35H43.9972L45.8722 32.0909L43.9972 29.1818H44.8267ZM54.2067 31H53.5021C53.4605 30.7973 53.3875 30.6193 53.2834 30.4659C53.1811 30.3125 53.0561 30.1837 52.9084 30.0795C52.7625 29.9735 52.6006 29.8939 52.4226 29.8409C52.2446 29.7879 52.0589 29.7614 51.8658 29.7614C51.5135 29.7614 51.1944 29.8504 50.9084 30.0284C50.6243 30.2064 50.398 30.4688 50.2294 30.8153C50.0627 31.1619 49.9794 31.5871 49.9794 32.0909C49.9794 32.5947 50.0627 33.0199 50.2294 33.3665C50.398 33.7131 50.6243 33.9754 50.9084 34.1534C51.1944 34.3314 51.5135 34.4205 51.8658 34.4205C52.0589 34.4205 52.2446 34.3939 52.4226 34.3409C52.6006 34.2879 52.7625 34.2093 52.9084 34.1051C53.0561 33.9991 53.1811 33.8693 53.2834 33.7159C53.3875 33.5606 53.4605 33.3826 53.5021 33.1818H54.2067C54.1536 33.4792 54.0571 33.7453 53.9169 33.9801C53.7768 34.215 53.6025 34.4148 53.3942 34.5795C53.1858 34.7424 52.9519 34.8665 52.6925 34.9517C52.4349 35.0369 52.1593 35.0795 51.8658 35.0795C51.3696 35.0795 50.9283 34.9583 50.5419 34.7159C50.1555 34.4735 49.8516 34.1288 49.63 33.6818C49.4084 33.2348 49.2976 32.7045 49.2976 32.0909C49.2976 31.4773 49.4084 30.947 49.63 30.5C49.8516 30.053 50.1555 29.7083 50.5419 29.4659C50.9283 29.2235 51.3696 29.1023 51.8658 29.1023C52.1593 29.1023 52.4349 29.1449 52.6925 29.2301C52.9519 29.3153 53.1858 29.4403 53.3942 29.6051C53.6025 29.768 53.7768 29.9669 53.9169 30.2017C54.0571 30.4347 54.1536 30.7008 54.2067 31ZM55.3452 35V29.1818H56.0497V31.7727H59.152V29.1818H59.8565V35H59.152V32.3977H56.0497V35H55.3452ZM61.5057 35H60.767L62.9034 29.1818H63.6307L65.767 35H65.0284L63.2898 30.1023H63.2443L61.5057 35ZM61.7784 32.7273H64.7557V33.3523H61.7784V32.7273ZM71.2869 29.1818V35H70.6051L67.4347 30.4318H67.3778V35H66.6733V29.1818H67.3551L70.5369 33.7614H70.5938V29.1818H71.2869ZM76.674 31C76.6115 30.8087 76.5291 30.6373 76.4268 30.4858C76.3265 30.3324 76.2062 30.2017 76.0661 30.0938C75.9278 29.9858 75.7706 29.9034 75.5945 29.8466C75.4183 29.7898 75.2251 29.7614 75.0149 29.7614C74.6702 29.7614 74.3568 29.8504 74.0746 30.0284C73.7924 30.2064 73.5679 30.4688 73.4013 30.8153C73.2346 31.1619 73.1513 31.5871 73.1513 32.0909C73.1513 32.5947 73.2356 33.0199 73.4041 33.3665C73.5727 33.7131 73.8009 33.9754 74.0888 34.1534C74.3767 34.3314 74.7005 34.4205 75.0604 34.4205C75.3937 34.4205 75.6873 34.3494 75.9411 34.2074C76.1967 34.0634 76.3956 33.8608 76.5376 33.5994C76.6816 33.3362 76.7536 33.0265 76.7536 32.6705L76.9695 32.7159H75.2195V32.0909H77.4354V32.7159C77.4354 33.1951 77.3331 33.6117 77.1286 33.9659C76.9259 34.3201 76.6456 34.5947 76.2876 34.7898C75.9316 34.983 75.5225 35.0795 75.0604 35.0795C74.5452 35.0795 74.0926 34.9583 73.7024 34.7159C73.3142 34.4735 73.0111 34.1288 72.7933 33.6818C72.5774 33.2348 72.4695 32.7045 72.4695 32.0909C72.4695 31.6307 72.531 31.2169 72.6541 30.8494C72.7791 30.4801 72.9553 30.1657 73.1825 29.9062C73.4098 29.6468 73.6787 29.4479 73.9893 29.3097C74.3 29.1714 74.6418 29.1023 75.0149 29.1023C75.3217 29.1023 75.6077 29.1487 75.8729 29.2415C76.1399 29.3324 76.3776 29.4621 76.5859 29.6307C76.7962 29.7973 76.9714 29.9972 77.1115 30.2301C77.2517 30.4612 77.3482 30.7178 77.4013 31H76.674ZM78.642 35V29.1818H82.1534V29.8068H79.3466V31.7727H81.9716V32.3977H79.3466V34.375H82.1989V35H78.642ZM85.6733 35V29.1818H87.7074C88.1127 29.1818 88.447 29.2519 88.7102 29.392C88.9735 29.5303 89.1695 29.7169 89.2983 29.9517C89.4271 30.1847 89.4915 30.4432 89.4915 30.7273C89.4915 30.9773 89.447 31.1837 89.358 31.3466C89.2708 31.5095 89.1553 31.6383 89.0114 31.733C88.8693 31.8277 88.715 31.8977 88.5483 31.9432V32C88.7263 32.0114 88.9053 32.0739 89.0852 32.1875C89.2652 32.3011 89.4157 32.464 89.5369 32.6761C89.6581 32.8883 89.7188 33.1477 89.7188 33.4545C89.7188 33.7462 89.6525 34.0085 89.5199 34.2415C89.3873 34.4744 89.178 34.6591 88.892 34.7955C88.6061 34.9318 88.2339 35 87.7756 35H85.6733ZM86.3778 34.375H87.7756C88.2358 34.375 88.5625 34.286 88.7557 34.108C88.9508 33.928 89.0483 33.7102 89.0483 33.4545C89.0483 33.2576 88.9981 33.0758 88.8977 32.9091C88.7973 32.7405 88.6544 32.6061 88.4688 32.5057C88.2831 32.4034 88.0634 32.3523 87.8097 32.3523H86.3778V34.375ZM86.3778 31.7386H87.6847C87.8968 31.7386 88.0881 31.697 88.2585 31.6136C88.4309 31.5303 88.5672 31.4129 88.6676 31.2614C88.7699 31.1098 88.821 30.9318 88.821 30.7273C88.821 30.4716 88.732 30.2547 88.554 30.0767C88.3759 29.8968 88.0938 29.8068 87.7074 29.8068H86.3778V31.7386ZM90.3764 29.1818H91.1832L92.7969 31.8977H92.8651L94.4787 29.1818H95.2855L93.1832 32.6023V35H92.4787V32.6023L90.3764 29.1818ZM98.1825 35V29.1818H99.5888V33.858H102.009V35H98.1825ZM104.143 29.1818V35H102.737V29.1818H104.143ZM105.808 35.0824C105.603 35.0824 105.428 35.0104 105.282 34.8665C105.138 34.7225 105.067 34.5483 105.069 34.3438C105.067 34.143 105.138 33.9716 105.282 33.8295C105.428 33.6856 105.603 33.6136 105.808 33.6136C106.001 33.6136 106.171 33.6856 106.319 33.8295C106.469 33.9716 106.544 34.143 106.546 34.3438C106.544 34.4801 106.508 34.6042 106.438 34.7159C106.37 34.8277 106.28 34.9167 106.168 34.983C106.058 35.0492 105.938 35.0824 105.808 35.0824ZM107.464 35V29.1818H111.435V30.3239H108.87V31.517H111.183V32.6619H108.87V35H107.464ZM113.55 29.1818V35H112.143V29.1818H113.55Z"
      fill="#31007A"
    />
  </svg>
);

const Swap = (props) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="M7.5 20L2.5 15L7.5 10L8.9 11.425L6.325 14L13.5 14V16L6.325 16L8.9 18.575L7.5 20ZM17.5 14L16.1 12.575L18.675 10L11.5 10L11.5 8L18.675 8L16.1 5.425L17.5 4L22.5 9L17.5 14Z"
      fill="black"
    />
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  console.log('pathname', location.pathname);
  const swapUrl = '/swap';
  const dashboardUrl = '/dashboard'; // --> will be replaced with gas-feature

  // Dropdown-Menu - Source: https://mui.com/material-ui/react-menu/
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <NavbarContainer>
      <MUILink href="/" sx={{ height: '48px' }}>
        <JumperLogo />
      </MUILink>
      <NavbarLinkContainer>
        <NavbarLink
          active={
            (location.pathname.includes(swapUrl) ||
              location.pathname === '/') ??
            true
          }
          href={swapUrl}
          hoverBackgroundColor={'#f5b5ff7a'}
        >
          <>
            <Swap style={{ marginRight: '6px' }} />
            <NavbarLinkText>Swap</NavbarLinkText>
          </>
        </NavbarLink>
        <NavbarLink
          active={location.pathname.includes(dashboardUrl) ?? true}
          href={dashboardUrl}
          hoverBackgroundColor={'#f5b5ff7a'}
        >
          <NavbarLinkText>Dashboard</NavbarLinkText>
        </NavbarLink>
      </NavbarLinkContainer>
      <NavbarManagement className="settings">
        <WalletManagementButtons
          backgroundColor={'#31007A'}
          hoverBackgroundColor={'#31007a8c'}
          walletManagement={useWallet()}
        />
        <NavbarDropdownButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreHorizIcon />
        </NavbarDropdownButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </NavbarManagement>
    </NavbarContainer>
  );
};

export default Navbar;
