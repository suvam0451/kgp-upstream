import React, { useState, useEffect, useRef } from 'react'
import { useWindowScroll, useGetSetState } from 'react-use'
import axios, { AxiosRequestConfig } from 'axios'
import Library from '../components/FontAwesomeLib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IScrollToTopProps {}

export function ScrollToTop(props: IScrollToTopProps) {
  const { y: pageYOffset } = useWindowScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    return () => {}
  }, [pageYOffset])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  if (!visible) {
    return null
  }
  return (
    <div className="scroll_to_top cursor-pointer text-center" onClick={scrollToTop}>
      <FontAwesomeIcon icon="chevron-circle-up" color="green" height="48px" width="48px" />
    </div>
  )
}

interface IScrollToElementProps<T> {
  targetRef: React.RefObject<HTMLInputElement>
}

export function ScrolToElement<T>(props: IScrollToElementProps<T>) {
  const { y: pageYOffset } = useWindowScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    return () => {}
  }, [pageYOffset])

  const scrollToTop = () => window.scrollTo({ top: props.targetRef.current?.scrollHeight, behavior: 'smooth' })
  if (!visible) {
    return null
  }
  return (
    <div className="scroll_to_top cursor-pointer text-center" onClick={scrollToTop}>
      <i className="icon fas fa-chevron-up" />
    </div>
  )
}

export function FileUploadElement(file: string | Blob) {
  const [uploading, setUploading] = useState(false)

  function uploadFile() {
    let data = new FormData()
    data.append('file', file)
    const options: AxiosRequestConfig = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)

        if (percent < 100) {
          // useGetSetState(
          setUploading(false)
        }
      }
    }
    axios.post('', data, options).then(res => {
      console.log(res)
    })
  }
  return <div></div>
}
