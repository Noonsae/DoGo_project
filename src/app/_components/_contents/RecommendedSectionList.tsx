import React from 'react'
import TopPicksSection from './TopPicksSection'
import SuggestionsForYouSection from './SuggestionsForYouSection'
import Discover from './Discover'
import RecommendedSection from './RecommendedSection'

const RecommendedSectionList = () => {
  return (
    <>
      <TopPicksSection />
      <SuggestionsForYouSection />
      <RecommendedSection/>
      <Discover />
    </>
  );
}

export default RecommendedSectionList;