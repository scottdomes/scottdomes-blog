import React from "react"
import Bio from "./bio"
import SEO from "./seo"
import { rhythm, scale } from "../utils/typography"
import { MDXRenderer } from "gatsby-plugin-mdx"

const BlogDisplay = ({ post }) => {
  return (
    <div>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <div
        style={{
          marginBottom: rhythm(1),
        }}
      >
        <h1 sty>{post.frontmatter.title}</h1>
        <h3 style={{ marginBottom: 1, marginTop: rhythm(-0.5) }}>
          {post.frontmatter.description}
        </h3>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: 0,
          }}
        >
          {post.frontmatter.date}
        </p>
      </div>
      <MDXRenderer>{post.body}</MDXRenderer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />
    </div>
  )
}

export default BlogDisplay
