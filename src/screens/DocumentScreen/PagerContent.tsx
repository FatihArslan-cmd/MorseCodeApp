import React from 'react';
import { StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import * as Animatable from 'react-native-animatable';
import PageItem from './PageItem';
import PageIndicator from './PageIndicator';
import { useTranslation } from 'react-i18next';

interface PagerContentProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PagerContent: React.FC<PagerContentProps> = ({ currentPage, setCurrentPage }) => {
  const { t } = useTranslation();

  return (
    <>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
        useNext={true}
      >
        <Animatable.View
          key="1"
          style={styles.page}
          animation="slideInRight"
          duration={1000}
        >
          <PageItem
            imageUri="https://picsum.photos/700"
            heading={t('Introduction to Morse Code')}
            text={t('Morse code is a method used in telecommunication to encode text characters as standardized sequences of two different signal durations, called dots and dashes.')}
          />
        </Animatable.View>
        <PageItem
          key="2"
          imageUri="https://cdn.yeniakit.com.tr/images/news/625/samuel-morse-8e543a.jpeg"
          heading={t('History of Morse Code')}
          text={t('Invented in the early 1830s by Samuel Morse and Alfred Vail, Morse code was the primary method of electronic communication before the advent of modern telecommunication technologies.')}
        />
        <PageItem
          key="3"
          imageUri="https://images.unsplash.com/photo-1557264303-891df35169e7"
          heading={t('Learning Morse Code')}
          text={t('Each letter and number in Morse code is represented by a unique combination of dots and dashes. For instance, S is ... and O is ---.')}
        />
        <PageItem
          key="4"
          imageUri="https://images.unsplash.com/photo-1524533541976-217d90eab073"
          text={t('This app offers an interactive Morse code learning experience.')}
          showButton
        />
      </PagerView>
      <PageIndicator total={4} currentIndex={currentPage} />
    </>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: '100%',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default PagerContent;
