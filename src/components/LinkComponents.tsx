import * as React from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Popover and menus
import { PopoverX } from '../components/MenuSection'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface IGatsbyLinkProps {
  label: string
  link: string
  internal?: boolean
  className?: string
}

/** Resolves internal links to gatsby Link elements */
export function GatsbyLink(props: IGatsbyLinkProps) {
  if (typeof props.internal == 'undefined') {
    return (
      <a href={props.link} className={props.className ? props.className : ''}>
        {props.label}
      </a>
    )
  } else {
    return (
      <Link to={props.link} className={props.className ? props.className : ''}>
        {props.label}
      </Link>
    )
  }
}

export interface IGatsbyLinkFAProps {
  label: string
  link: string
  internal?: boolean
  icon?: IconProp
  iconcolor?: string
  className?: string
}

/** Resolves internal links to gatsby Link. Supports FontAwesome icons. */
export function GatsbyLinkFA(props: IGatsbyLinkFAProps) {
  if (typeof props.internal == 'undefined') {
    if (typeof props.icon == 'undefined') {
      return (
        <a href={props.link} className={props.className ? props.className : ''}>
          {props.label}
        </a>
      )
    } else {
      // icon requested
      return (
        <a href={props.link} className={props.className ? props.className : ''}>
          <FontAwesomeIcon icon={props.icon} color={props.iconcolor} />
          {props.label}
        </a>
      )
    }
  } else {
    if (typeof props.icon == 'undefined') {
      return (
        <Link to={props.link} className={props.className ? props.className : ''}>
          {props.label}
        </Link>
      )
    } else {
      return (
        <Link to={props.link} className={props.className ? props.className : ''}>
          <FontAwesomeIcon icon={props.icon} color={props.iconcolor} />
          {props.label}
        </Link>
      )
    }
  }
}
