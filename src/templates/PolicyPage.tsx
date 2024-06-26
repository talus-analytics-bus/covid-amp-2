import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface PageContext {
  data: {
    policy: {
      data: {
        Effective_start_date: string
        Actual_end_date: string
        Policy_category: string
        Policy_subcategory: string
        Policy_description: string
        Policy_target: string
        Authorizing_level_of_government: string
        Authorizing_country_name: {
          data: {
            Country_Name: string
            ISO_alpha3_code: string
          }
        }
        Attachment_for_policy: {
          localFiles?: {
            prettySize: string
            publicURL: string
          }[]
        }
      }
    }
  }
  pageContext: {
    Unique_ID: string
  }
}

const Policy = styled.div``

const PolicyPage = ({ data: { policy }, pageContext }: PageContext) => {
  if (!policy.data.Attachment_for_policy.localFiles)
    console.log('File not found ' + pageContext.Unique_ID)
  return (
    <>
      <h2>Policy page</h2>
      <Policy>
        <h3>Start: {policy.data.Effective_start_date}</h3>
        <h3>End: {policy.data.Actual_end_date}</h3>
        <h4>Description</h4>
        <p>{policy.data.Policy_description}</p>
        <h5>
          <a href={policy.data.Attachment_for_policy.localFiles?.[0].publicURL}>
            Download Original Document
          </a>
        </h5>
      </Policy>
    </>
  )
}

export const query = graphql`
  query ($Unique_ID: String!) {
    policy: airtable(data: { Unique_ID: { eq: $Unique_ID } }) {
      data {
        Effective_start_date
        Actual_end_date
        Policy_category
        Policy_subcategory
        Policy_description
        Policy_target
        Authorizing_level_of_government
        Authorizing_country_name {
          data {
            Country_Name
            ISO_alpha3_code
          }
        }
        Attachment_for_policy {
          localFiles {
            prettySize
            publicURL
          }
        }
      }
    }
  }
`

export default PolicyPage
