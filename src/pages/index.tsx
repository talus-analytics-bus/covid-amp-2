import React from 'react'

import CMS from '@talus-analytics/library.airtable-cms'
import Providers from '../components/layout/Providers'

import Main from '../components/layout/Main'

import useIndexPageData from '../cmsHooks/useIndexPageData'

const IndexPage = (): JSX.Element => {
  const data = useIndexPageData()

  return (
    // all pages should be wrapped in the Providers component
    // all pages should start with CMS.SEO to set metadata.
    <Providers>
      <CMS.SEO />
      <Main>
        <CMS.Image name="Talus Logo" data={data} />
        <h1>COVID AMP 2 Data Pipeline Proof of Concept Site</h1>
      </Main>
    </Providers>
  )
}

export default IndexPage
