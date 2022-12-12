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

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const placePageTemplate = path.resolve('./src/templates/PlacePage.tsx')

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

  places.data.countries.nodes.forEach(node => {
    actions.createPage({
      path: `policies/${node.data.ISO_alpha3_code}`,
      component: placePageTemplate,
      context: {
        iso3: node.data.ISO_alpha3_code,
        name: node.data.Country_Name,
      },
    })
  })

  places.data.states.nodes.forEach(node => {
    actions.createPage({
      path: `policies/USA/${node.data.Name}`,
      component: placePageTemplate,
      context: {
        iso3: 'USA',
        name: node.data.Name,
      },
    })
  })
}
