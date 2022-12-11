import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface PageContext {
  data: {
    policies: {
      nodes: {
        data: {
          Actual_end_date: string
          Effective_start_date: string
          Policy_category: string
          Policy_subcategory: string
          Policy_description: string
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
          <h3>Description</h3>
          // <p>{policy.data.Policy_description}</p>
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
          Actual_end_date
          Effective_start_date
          Policy_category
          Policy_subcategory
          # Policy_description
        }
      }
    }
  }
`

export default PolicyPage
