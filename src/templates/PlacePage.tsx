import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface PageContext {
  data: {
    policies: {
      nodes: {
        data: {
          Unique_ID: string
          Actual_end_date: string
          Effective_start_date: string
          Policy_category: string
          Policy_subcategory: string
        }
      }[]
    }
  }
  pageContext: {
    iso3: string
    name: string
  }
}

const Policy = styled.div``

const PolicyPage = ({ data, pageContext }: PageContext) => {
  return (
    <>
      <h1>{pageContext.name}</h1>
      <h2>Policies</h2>
      {data.policies.nodes.map(policy => (
        <Policy>
          <h3>Start: {policy.data.Effective_start_date}</h3>
          <h3>End: {policy.data.Actual_end_date}</h3>
          <Link to={`/policies/${pageContext.iso3}/${policy.data.Unique_ID}`}>
            {policy.data.Unique_ID}
          </Link>
        </Policy>
      ))}
    </>
  )
}

export const query = graphql`
  query ($iso3: String!) {
    policies: allAirtable(
      filter: {
        table: { eq: "Policy Database" }
        data: { Authorizing_country_ISO: { eq: $iso3 } }
      }
    ) {
      nodes {
        data {
          Unique_ID
          Actual_end_date
          Effective_start_date
          Policy_category
          Policy_subcategory
        }
      }
    }
  }
`

export default PolicyPage
