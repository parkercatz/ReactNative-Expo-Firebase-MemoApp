import React from 'react'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { useFonts } from '@use-expo/font'
import { number, string, oneOf } from 'prop-types'
// oneOf = 指定された値の中のいずれかであること

import icomoon from '../../assets/fonts/icomoon.ttf'
import selection from '../../assets/fonts/selection.json'

export default function Icon(props) {
  const [fontLoaded] = useFonts({ icomoon })
  const { name, size, color } = props
  const CustomIcon = createIconSetFromIcoMoon(selection)
  if (!fontLoaded) {
    return null
  }
  return (
    <CustomIcon
      name={name}
      size={size}
      color={color}
      style={{ lineHeight: size - 1 }} // Androidで少しアイコンが上に表示されてるためstyleを適用
    />
  )
}

Icon.propTypes = {
  name: oneOf(['plus', 'delete', 'pencil', 'check']).isRequired,
  size: number,
  color: string,
}

Icon.defaultProps = {
  size: 24,
  color: '#000',
}
