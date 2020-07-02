import React, { useState, useRef, memo } from 'react'
import { Link } from 'gatsby'

import { Helmet } from 'react-helmet'
import { Footer, ForwardBackNavSection } from '../components/Decorators'
import { Switch, Icon, Intent } from '@blueprintjs/core'

// FontAwesome
import YTAPI from '../api/youtubecards'
import DataInput from '../components/DataInput'
import Sidebar from '../components/SidebarComponent'
import NavBar from '../components/NavBar'
import '../components/FontAwesomeLib'
import '../components/special/@styles.scss'

import { DocPage } from '../components/PageLayouts'

const arePropsEqual = (prevProps: IIndexPageProps, nextProps: IIndexPageProps) => {
  // Empty or unchanged
  // if (nextProps.updateLinkTest === '' || prevProps.updateLinkTest === nextProps.updateLinkTest) {
  //   return true
  // } else {
  //   return false
  // }
  return false
}

interface IIndexPageProps {
  updateLinkTest: string
  deleteLinkTest: string
}

function IndexPage(props: IIndexPageProps) {
  // STATE management
  const [myLinkArray, setMyLinkArray] = useState(<></>)
  const [cardLinks, setCardLinks] = useState<string[] | null>(['fdkU6MgrUV4', 'RIZdjT1472Y'])
  const [carousalHidden, setCarousalHidden] = useState(false)
  const [queryStatusSection, setQueryStatusSection] = useState(<></>)
  const updateCardsRef = useRef<HTMLInputElement>(null)
  const deleteCardsRef = useRef<HTMLInputElement>(null)
  const [insertValue, setInsertValue] = useState('')
  const [updateLinkValid, setUpdateLinkValid] = useState(false)
  const [updateInputCSS, setUpdateInputCSS] = useState('bp3-input')
  //
  const [initFlag, setInitFlag] = useState(true)

  React.useEffect(() => {
    if (initFlag) {
      YTAPI.readcards(setMyLinkArray)
      setInitFlag(false)
    }
    let ex: RegExp = /www.youtube.com\/watch\?v=([_\-=a-zA-Z0-9]{11})/
    let updateTarget = updateCardsRef.current?.value!

    // Update color of input component
    console.log('Okay', updateTarget)

    if (updateTarget !== '') {
      if (ex.test(updateTarget)) {
        setUpdateInputCSS('bp3-input bp3-intent-success')
        setUpdateLinkValid(true)
      } else {
        setUpdateInputCSS('bp3-input bp3-intent-danger')
        setUpdateLinkValid(false)
      }
    } else {
      setUpdateInputCSS('bp3-input')
      setUpdateLinkValid(false)
    }

    return () => {
      // cleanup
    }
  }, [carousalHidden, updateCardsRef.current?.value, insertValue])

  function deletecards(_ref: React.RefObject<HTMLInputElement>) {
    return <></>
  }

  return (
    <>
      <div className="container_root">
        <Helmet></Helmet>
        <NavBar />
        <Sidebar SectionIdx={0} />
        <DocPage>
          <h1>Introduction page</h1>
          <p>
            This means that, right now anyone with access to this page can add/remove videos. Of course, we won't need that in aproduction
            site. This is just to demonstrate that videos can be dynamically added via youtube/facebook API... or someone can add the links
            offline and they will be available here...
          </p>
          <blockquote>I think the researchgate embed service is not active 24*7. The right section may appear empty, at times.</blockquote>
          <h3>Database provider</h3>
          <p>
            This is an example reel that would be generated and updated client-side. We are using faunadb as our database provider. The free
            tier has a read operation limit of <b>100K requests/day</b>. It is highly unlikely to reach that limit with a non-commercial
            website. The pricing beyond that starts at <b>$0.05 per 100K read</b>.
          </p>

          <p>
            If you enter a valid youtube link{' '}
            <i>(that was not already present, in the database, this reel will auto-update and that link will be added)</i>
          </p>
          {carousalHidden ? null : <div>{myLinkArray}</div>}
          <blockquote>For now, if a link exists, nothing will happen. In that case, try a different link.</blockquote>
          <h3>Adding links</h3>
          <p>
            We can edit to the database from anywhere. Here are some unused links to try out. Paste them into the input section and press
            the lock icon{' '}
            <i>
              (If something is wrong, the section should give a red outline. If the link seems fine, it will instead give green outline)
            </i>
            . If it's not a duplicate, it will get added. When we will turn the switch off and on above, we should get the updated links for
            the carousal.
          </p>
          {/* Input group */}
          {/* <DataInput
                onClick={() => {

                }}
                placeholder="Enter valid youtube URL..."
                ref={updateCardsRef}
              /> */}
          <div className="bp3-input-group .modifier">
            <input
              onChange={() => {
                setInsertValue(updateCardsRef.current?.value!)
              }}
              ref={updateCardsRef}
              type="url"
              className={updateInputCSS}
              placeholder="Enter valid youtube URL..."
            />
            <button
              className="bp3-button bp3-minimal bp3-intent-warning bp3-icon-lock"
              onClick={() => {
                updateLinkValid ? YTAPI.updatecards(updateCardsRef, setMyLinkArray) : console.log('Input invalid...')
              }}
            />
          </div>
          <div>{queryStatusSection}</div>
          <ul>
            <li>
              https://www.youtube.com/watch?v=6VJBBUqr1wM <i> -- (used)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=jYUvzH4tCkA <i> -- (unused)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=0SA8aCb3KYc <i> -- (unused)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=WGsHz_XuCsI <i> -- (unused)</i>
            </li>
            <li>
              https://www.youtube.com/watch?v=XgdY_s1LsZc <i> -- (unused)</i>
            </li>
          </ul>
          <p>It should have form validation and respond to invalid links</p>
          <p>
            On that note, this is not something that would be done online like this. Because our website is static, we don't have any
            id-password or admin login or anything.
            <i>(i.e.- everything is produced on the client-side, when a person visits/refreshes the page)</i>.
          </p>

          <h3>Deleting entries</h3>
          <p>Missing content</p>
          <DataInput
            onClick={() => {
              deletecards(deleteCardsRef)
            }}
            placeholder="Placeholder..."
            ref={deleteCardsRef}
          />

          <h3>Extra thoughts</h3>
          <p>
            Maybe flat styling like this and more conventional font choices would make the website more professional. Aside from adding page
            contents, link sections like this would need to be added. The problem is, of course appropriate icon selection and color
            palettes. A lot of sections for this website would be filled and look better with banners, logos and theming.
          </p>

          <ForwardBackNavSection
            nextlink="/dynamic-menus/"
            prevlink="/dynamic-menus/"
            nextlinktitle="Dynamic menus"
            prevlinktitle="Dynamic menus"
          />
        </DocPage>
      </div>
    </>
  )
}

// export default memo(IndexPage, arePropsEqual)
export default IndexPage
