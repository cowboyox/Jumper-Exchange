import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  type Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { APYIcon } from 'src/components/illustrations/APYIcon';
import { XPDisplayBox } from 'src/components/ProfilePage/QuestCard/QuestCard.style';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from 'src/const/trackingKeys';
import { XPIconBox } from '../../QuestCard/QuestCard.style';
import { SignatureCTA } from '../SignatureCTA/SignatureCTA';
import { FlexCenterRowBox } from '../SuperfestMissionPage.style';
import {
  CTAExplanationBox,
  CTAMainBox,
  MissionCtaButton,
  SeveralCTABox,
  SeveralMissionCtaContainer,
  StartedTitleBox,
  StartedTitleTypography,
} from './MissionCTA.style';

export interface CTALinkInt {
  logo: string;
  text: string;
  link: string;
  claimingId: string;
  rewardId?: string;
  apy?: number;
  weeklyApy?: string;
}
interface MissionCtaProps {
  title?: string;
  url?: string;
  rewards?: number;
  id?: number;
  label?: string;
  CTAs: CTALinkInt[];
  variableWeeklyAPY?: boolean;
  signature?: boolean;
  rewardRange?: string;
  isTurtleMember?: boolean;
}

export const MissionCTA = ({
  CTAs,
  rewards,
  id,
  label,
  variableWeeklyAPY,
  signature,
  rewardRange,
  isTurtleMember,
}: MissionCtaProps) => {
  const { trackEvent } = useUserTracking();
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  const handleClick = ({
    rewardId,
    id,
    claimingId,
    title,
  }: {
    rewardId?: string;
    id?: number;
    claimingId: string;
    title?: string;
  }) => {
    trackEvent({
      category: TrackingCategory.Missions,
      action: TrackingAction.ClickMissionCta,
      label: `click-mission-cta-${id}`,
      data: {
        [TrackingEventParameter.MissionCtaRewardId]: rewardId || '',
        [TrackingEventParameter.MissionCtaClaimingId]: claimingId || '',
        [TrackingEventParameter.MissionCtaTitle]: title || '',
        [TrackingEventParameter.MissionCtaPartnerId]: id || '',
        [TrackingEventParameter.MissionCtaLabel]: label || '',
      },
    });
  };
  return (
    <CTAMainBox>
      <StartedTitleBox>
        <StartedTitleTypography>Get Started</StartedTitleTypography>
        {!signature && rewards ? (
          <Box marginTop="32px">
            {
              //* todo: check typography (sora) *//
            }
            <Typography
              variant="bodyMedium"
              fontSize={{ xs: '14px', md: '18px' }}
              lineHeight={{ xs: '14px', md: '18px' }}
              fontWeight={400}
            >
              Completing any mission below makes you eligible for OP rewards and
              XP.
            </Typography>
          </Box>
        ) : undefined}
      </StartedTitleBox>
      <SeveralCTABox>
        {signature && <SignatureCTA isTurtleMember={isTurtleMember} />}
        {CTAs.map((CTA: CTALinkInt, i: number) => {
          return (
            <Link
              key={`cta-mission-${i}`}
              style={{
                textDecoration: 'none',
                width: '100%',
                color: 'inherit',
                marginBottom: '16px',
              }}
              href={CTA.link || '/'}
              target="_blank"
            >
              <SeveralMissionCtaContainer
                onClick={() =>
                  handleClick({
                    id,
                    rewardId: CTA.rewardId,
                    claimingId: CTA.claimingId,
                    title: CTA.text,
                  })
                }
              >
                <CTAExplanationBox>
                  <Image
                    src={CTA.logo}
                    alt={`Image for ${CTA.logo}`}
                    width={48}
                    height={48}
                    priority={false}
                  />
                  {
                    //* todo: check typography (sora) *//
                  }
                  <Typography
                    variant="headerMedium"
                    marginTop={{ xs: '16px', md: '0px' }}
                    fontSize={{ xs: '16px', sm: '22px' }}
                    fontWeight={700}
                    marginLeft={'16px'}
                  >
                    {CTA.text ?? 'Go to Protocol Page'}
                  </Typography>
                </CTAExplanationBox>
                <FlexCenterRowBox>
                  {CTA.apy && !variableWeeklyAPY && (
                    <XPDisplayBox
                      bgcolor={theme.palette.primary.main}
                      marginRight={'16px'}
                      height={'32px'}
                      minWidth={'88px'}
                    >
                      {
                        //* todo: check typography (sora) *//
                      }
                      <Typography
                        variant="bodyMediumStrong"
                        fontSize="16px"
                        fontWeight={700}
                        lineHeight="20px"
                        color={'#ffffff'}
                      >
                        {`${Number(CTA.apy).toFixed(1)}%`}
                      </Typography>
                      <XPIconBox marginLeft="4px">
                        <APYIcon size={24} />
                      </XPIconBox>
                    </XPDisplayBox>
                  )}
                  {variableWeeklyAPY && (
                    <XPDisplayBox
                      bgcolor={theme.palette.primary.main}
                      marginRight={'16px'}
                      height={'32px'}
                      minWidth={'88px'}
                    >
                      {
                        //* todo: check typography (sora) *//
                      }
                      <Typography
                        variant="bodyMediumStrong"
                        fontSize="16px"
                        fontWeight={700}
                        lineHeight="20px"
                        color={'#ffffff'}
                      >
                        {CTA?.weeklyApy
                          ? CTA?.weeklyApy
                          : rewardRange
                            ? rewardRange
                            : `VAR.%`}
                      </Typography>
                      <XPIconBox marginLeft="4px">
                        <APYIcon size={24} />
                      </XPIconBox>
                    </XPDisplayBox>
                  )}
                  {!isMobile && (
                    <MissionCtaButton
                      onClick={() =>
                        handleClick({
                          id,
                          rewardId: CTA.rewardId,
                          title: CTA.text,
                          claimingId: CTA.claimingId,
                        })
                      }
                    >
                      <ArrowForwardIcon
                        sx={{
                          color: '#000000',
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    </MissionCtaButton>
                  )}
                </FlexCenterRowBox>
              </SeveralMissionCtaContainer>
            </Link>
          );
        })}
      </SeveralCTABox>
    </CTAMainBox>
  );
};
