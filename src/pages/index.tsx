import { useEffect } from 'react';

import type { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import SettingButton from '@molecules/setting-button';
import Age from '@organisms/age';
import { fetchSpecialData } from 'src/services/supabase.server';
import { appAction, useAppState } from 'src/store';
import { pickersWidth } from 'src/utils/constants';
import { getSpecialSetting } from 'src/utils/helpers';

const Pickers = dynamic(() => import('@organisms/pickers'), {
  ssr: false,
});

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 80px);
  position: relative;
  transition: inherit;

  &.with-picker {
    width: calc(100% - ${pickersWidth});
  }
`;

export default function HomePage({ special }: AppPageProps) {
  const { isPickerShown, isReady, specialSetting } = useAppState();

  useEffect(() => {
    appAction._init(IS_EXTENSION ? null : getSpecialSetting(special));
  }, [special]);

  return (
    <>
      {!specialSetting && isReady && <SettingButton />}
      <HomePageWrapper className={isPickerShown ? 'with-picker' : ''}>
        {!specialSetting && <Pickers />}
        <Age />
      </HomePageWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps<
  AppPageProps
> = async () => {
  if (IS_EXTENSION) {
    return { props: {} };
  }

  const specialData = await fetchSpecialData();

  return {
    props: { special: specialData },
  };
};
