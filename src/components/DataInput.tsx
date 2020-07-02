import React, { useRef, forwardRef, useState, useEffect } from 'react'

interface IDataInputProps {
  // onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  placeholder?: string
  // inputref: HTMLInputElement
  validation?: RegExp
  onAccept: () => void
  onReject: () => void
}

/** Input section. Accepts and onClick callback function. */
export function InputWithValidation(props: IDataInputProps) {
  const [InsertValue, setInsertValue] = useState('')
  const [InputCSS, setInputCSS] = useState('bp3-input')
  const InputRef = useRef<HTMLInputElement>(null)
  const [UpdateLinkValid, setUpdateLinkValid] = useState(false)

  useEffect(() => {
    let updateTarget = InputRef.current?.value!

    if (updateTarget !== '') {
      if (props.validation?.test(updateTarget)) {
        setInputCSS('bp3-input bp3-intent-success')
        setUpdateLinkValid(true)
      } else {
        setInputCSS('bp3-input bp3-intent-danger')
        setUpdateLinkValid(false)
      }
    } else {
      setInputCSS('bp3-input')
      setUpdateLinkValid(false)
    }

    return () => {}
  }, [InsertValue])

  function buttonPress() {
    if (UpdateLinkValid) {
      props.onAccept()
    } else {
      props.onReject()
    }
  }
  return (
    <div className="bp3-input-group .modifier">
      <input
        ref={InputRef}
        type="url"
        className={InputCSS}
        placeholder={props.placeholder}
        onChange={() => {
          setInsertValue(InputRef.current?.value!)
        }}
      />
      <button className="bp3-button bp3-minimal bp3-intent-warning bp3-icon-lock" onClick={buttonPress} />
    </div>
  )
}
