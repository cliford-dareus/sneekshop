import React from 'react'

type Props = {}

const Sitefooter = (props: Props) => {
  return (
    <footer className="h-[400px] bg-red-600">
      <div className="container h-full w-full grid grid-cols-4 place-content-center">
        <div className=''>
          <ul>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
          </ul>
        </div>
        <div className=''>
          <ul>
            <li>Lorem, ipsum .</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum .</li>
          </ul>
        </div>
        <div className=''>
          <ul>
            <li>Lorem, ipsum .</li>
            <li>Lorem, ipsum dolor.</li>
            <li>Lorem, ipsum .</li>
            <li>Lorem, ipsum dolor.</li>
          </ul>
        </div>
        <div className=''>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            at!
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Sitefooter