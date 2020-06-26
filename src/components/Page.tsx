import * as React from 'react'
import styled from '@emotion/styled'

import { dimensions } from '../styles/variables'

/** Page Component
 *  Has some padding
 */
const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${dimensions.containerPadding}rem;
  margin-bottom: 1rem;
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps> = ({ children, className }) => <StyledPage className={className}>{children}</StyledPage>

export default Page
