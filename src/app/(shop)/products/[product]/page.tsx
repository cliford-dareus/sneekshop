import React from 'react'


const Page = ({ params }: { params: { product: string } }) => {
  return <div>{params.product}</div>;
};

export default Page