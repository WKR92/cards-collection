import React from 'react'

interface head {
  params: {
    cardName: string[];
  }
}
export const head = ({ params }: head) => {
  const [name] = params.cardName;
  return (
    <>
      <title>name</title>
    </>
  )
}

export default head;