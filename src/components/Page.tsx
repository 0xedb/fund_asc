import React, {ReactNode} from 'react';

interface Props {
  children?: ReactNode;
}

function Page({children}: Props) {
  return (
    <div className="centered page">
      {children}
    </div>
  );
}

export default Page;
