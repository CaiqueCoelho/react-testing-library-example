import React from 'react'
import { GreetProps } from './greet.types'

export default function Greet(props: GreetProps) { 
  return (
    <div>{ props.name ? `Hello ${props.name}` : 'Hello Guest' }</div>
  )
}
