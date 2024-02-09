import React, { PropsWithChildren } from 'react';


export default function MainLayout(props: PropsWithChildren) {
  return (
    <div className='wrapper'>
      {props.children}
    </div>
  );
}
