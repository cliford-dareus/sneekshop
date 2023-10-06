import React from 'react'

type Props = {}

const Page = ({ params }: { params: { id: string } }) => {
    console.log(params)
  return <div></div>;
};

export default Page