import React from "react"
// Styles
import { Wrapper, FakeBgImage, Content } from "./BGImage.styles"

const BGImage = ({ fluid, title, className, children }) => (
  <Wrapper>
    <FakeBgImage fluid={fluid} title={title} />
    <Content className={className}>{children}</Content>
  </Wrapper>
)

export default BGImage
