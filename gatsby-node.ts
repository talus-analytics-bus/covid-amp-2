import * as path from 'path'
import { GatsbyNode } from 'gatsby'

interface Places {
  error?: unknown
  data?: {
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
}

interface PolicyIDs {
  error?: unknown
  data?: {
    policies: {
      nodes: {
        data: {
          Unique_ID: string
          Authorizing_country_name: {
            data: {
              ISO_alpha3_code: string
            }
          }[]
        }
      }[]
    }
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const places: Places = await graphql(`
    query {
      countries: allAirtable(
        filter: { table: { eq: "ISO Code Look-up" } }
        sort: { data: { Country_Name: ASC } }
      ) {
        nodes {
          data {
            ISO_alpha3_code
            Country_Name
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
  `)

  if (!places.data) throw new Error('Places query error')

  const placePageTemplate = path.resolve('./src/templates/PlacePage.tsx')

  places.data.countries.nodes.forEach(node => {
    actions.createPage({
      path: `/policies/${node.data.ISO_alpha3_code}`,
      component: placePageTemplate,
      context: {
        iso3: node.data.ISO_alpha3_code,
        name: node.data.Country_Name,
      },
    })
  })

  places.data.states.nodes.forEach(node => {
    actions.createPage({
      path: `/policies/USA/${node.data.Name}`,
      component: placePageTemplate,
      context: {
        iso3: 'USA',
        name: node.data.Name,
      },
    })
  })

  const policyIDs: PolicyIDs = await graphql(`
    query {
      policies: allAirtable(filter: { table: { eq: "Policy Database" } }) {
        nodes {
          data {
            Unique_ID
            Authorizing_country_name {
              data {
                Country_Name
                ISO_alpha3_code
              }
            }
          }
        }
      }
    }
  `)

  if (!policyIDs.data) throw new Error('Policy IDs query error')

  const policyPageTemplate = path.resolve('./src/templates/PolicyPage.tsx')

  console.log(policyIDs)

  policyIDs.data.policies.nodes.forEach(policy => {
    actions.createPage({
      path: `/policies/${policy.data.Authorizing_country_name[0].data.ISO_alpha3_code}/${policy.data.Unique_ID}`,
      component: policyPageTemplate,
      context: {
        Unique_ID: policy.data.Unique_ID,
      },
    })
  })
}
