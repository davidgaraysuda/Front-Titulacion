import React from 'react';
import Card from '../components/Card';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Card title="Card Title 1" description="Card Description 1" />
      <Card title="Card Title 2" description="Card Description 2" />
      <Card title="Card Title 3" description="Card Description 3" />
    </div>
  );
}

export default Home;

// About.tsx and Contact.tsx follow the same structure as Home.tsx
