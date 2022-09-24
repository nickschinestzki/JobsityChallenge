import React, { memo, useState } from "react"
import FastImage, { FastImageProps } from "react-native-fast-image"

interface ImagePropsWithWidth extends FastImageProps {
   width: number;
}

export const AutoHeightImage = memo(function AutoHeightImage({ width, ...props }: ImagePropsWithWidth) {
   const [height, setHeight] = useState(0)
   return (
      <FastImage
         {...props}
         style={[{ width, height }, props.style]}
         onLoad={(evt) => {
            setHeight((evt.nativeEvent.height / evt.nativeEvent.width) * width)
         }}
      />
   )
})