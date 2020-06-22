import React from "react"
import {Helmet} from "react-helmet"

const SEO = () => {
  const siteMetaData = {
    title: "Quadratask",
    description: "Todos in Ruby on Rails in React & React (R^4)"
  }
  const {title, description} = siteMetaData

  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={description}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:type"
        content="website"
      />
      <title>{title}</title>
    </Helmet>
  )
}

export default SEO
