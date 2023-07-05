import React from 'react';
import { Card as AntCard } from 'antd';

type Props = {
  title: string;
  description: string;
};

function Card({ title, description }: Props) {
  return (
    <AntCard title={title}>
      <p>{description}</p>
    </AntCard>
  );
}

export default Card;
