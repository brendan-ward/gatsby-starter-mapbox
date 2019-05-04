import React from 'react'
import { Flex, Box } from '@rebass/grid'

export const Columns = props => (
  <Flex
    flexWrap={['wrap', 'nowrap']}
    justifyContent="space-between"
    {...props}
    mx="-1rem"
    width="calc(100% + 2rem)" // expand to fill the space, accounting for the negative margins
  />
)

export const Column = props => <Box flex="1 1 auto" px="1rem" {...props} />
