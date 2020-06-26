import React from 'react';
import dynamic from 'next/dynamic';

interface Props {
  name: string;
}

function Illustration({ name }: Props) {
  const SvgComponent = dynamic(() => import(`../../assets/illustrations/${name}.svg`));
  return <SvgComponent />;
}

export default Illustration;
