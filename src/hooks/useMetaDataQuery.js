import { useStaticQuery, graphql } from "gatsby"

export const useMetaDataQuery = () => {
  const date = useStaticQuery(graphql`
    query MetaDataQuery {
      site {
        siteMetadata {
          author
          description
          title
        }
      }
    }
  `)

  return data.site.siteMetadata
}