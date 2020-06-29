import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { Navbar, NavbarHeading } from '@blueprintjs/core'
import styled from '@emotion/styled'

const DesktopNavbarSection = styled('div')`
  display: none;
  @media (min-width: 540px) {
    display: block;
  }
`

const MobileNavbar = styled('div')`
  display: block;
  @media (min-width: 540px) {
    display: none;
  }
`

function NavSection() {
  const [Collapsed, setCollapsed] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  /** 1. Changes drop shadow after user scrolls far enough */
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isScrolled = window.scrollY > 10
  //     if (isScrolled !== scrolled) {
  //       setScrolled(!scrolled)
  //     }
  //   }
  //   document.addEventListener('scroll', handleScroll, { passive: true })

  //   // Clean up after unmount
  //   return () => {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // })

  function MobileMenuToggle() {
    setCollapsed(!Collapsed)
  }

  return (
    <div className="navbar_main">
      <Navbar>
        <div className="bp3-navbar-group bp3-align-left">
          <NavbarHeading>Sample Website</NavbarHeading>
          <DesktopNavbarSection>
            <span className="bp3-navbar-divider" />
            <Link to="/publications">
              <button className="bp3-button bp3-minimal bp3-icon-home">Home</button>
            </Link>
            <button className="bp3-button bp3-minimal bp3-icon-document">Publications</button>

            <button className="bp3-button bp3-minimal bp3-icon-build">Tools</button>
            <a href="https://gitlab.com/winterwildfire">
              {/* git-repo */}
              <button className="bp3-button bp3-minimal bp3-icon-git-branch">Repositories</button>
            </a>
          </DesktopNavbarSection>
        </div>
        <MobileNavbar>
          <button className="p-2 bp3-navbar-group bp3-align-right bp3-button bp3-minimal" onClick={MobileMenuToggle}>
            {/* <img className="h-6 content-center" src={Hamburger} /> */}
          </button>
        </MobileNavbar>
      </Navbar>
    </div>
  )
}

export default NavSection
