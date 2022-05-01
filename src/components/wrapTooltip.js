import React from "react"
import { Tooltip } from "@material-ui/core"

function wrapTooltip(Component, componentName) {
  return ({ variant, color, placement, ...componentProps }) => {
    const colorString = color ? ` color="${color}"` : ""
    const variantString = variant ? ` variant="${variant}"` : ""
    return (
      <Tooltip
        title={`<${componentName}${colorString}${variantString}>`}
        placement={placement}
        arrow
      >
        <Component variant={variant} color={color} {...componentProps} />
      </Tooltip>
    )
  }
}

export default wrapTooltip
