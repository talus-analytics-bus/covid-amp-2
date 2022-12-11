import React from 'react'

import CMS from '@talus-analytics/library.airtable-cms'
import Providers from '../components/layout/Providers'

import Main from '../components/layout/Main'

import { graphql, Link } from 'gatsby'

interface QueryData {
  countries: {
    nodes: {
      data: {
        Country_Name: string
        ISO_alpha3_code: string
      }
    }[]
  }
  states: {
    nodes: {
      data: {
        Name: string
      }
    }[]
  }
}

const IndexPage = ({ data }: { data: QueryData }): JSX.Element => {
  return (
    // all pages should be wrapped in the Providers component
    // all pages should start with CMS.SEO to set metadata.
    <Providers>
      <CMS.SEO />
      <Main>
        <h1>COVID AMP 2 Data Pipeline Proof of Concept Site</h1>
        <h2>Countries</h2>
        <ul>
          {data.countries.nodes.map(country => (
            <li key={country.data.ISO_alpha3_code}>
              <Link to={`/policies/${country.data.ISO_alpha3_code}`}>
                {country.data.Country_Name}
              </Link>
            </li>
          ))}
        </ul>
        <h2>States</h2>
        <ul>
          {data.states.nodes.map(country => (
            <li key={country.data.Name}>
              <Link to={`/policies/USA/${country.data.Name}`}>
                {country.data.Name}
              </Link>
            </li>
          ))}
        </ul>
      </Main>
    </Providers>
  )
}

export const query = graphql`
  query {
    countries: allAirtable(
      filter: { table: { eq: "ISO Code Look-up" } }
      sort: { data: { Country_Name: ASC } }
    ) {
      nodes {
        data {
          Country_Name
          ISO_alpha3_code
        }
      }
    }
    states: allAirtableIntermediateAreas(
      filter: {
        data: { ISO_alpha3_code__from_ISO_Code_Look_up_: { eq: "USA" } }
      }
      sort: { data: { Name: ASC } }
    ) {
      nodes {
        data {
          Name
        }
      }
    }
  }
`

export default IndexPage
