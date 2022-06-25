import React, { useEffect } from 'react'
import { Progress } from '@chakra-ui/react'

const CreateProgress = ({ stage }) => {
  return (
    (stage > 0)
    ?
      <Progress
        value={stage*33.33}
        size={"xs"}
        colorScheme={"orange"}
        max={100}
        hasStripe={true}
        isAnimated={true}
      />
    :
      null
  )
}

const ProgressCompany = ({ stage=0 }) => {

  return (
    <CreateProgress stage={stage} />
  )
}

export default ProgressCompany