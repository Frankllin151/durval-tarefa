import React from 'react';
import { usePage } from '@inertiajs/react';

const KnowBot = () => {
  const page = usePage();
  console.log('usePage data:', page);

  return (
    <div>
      <h1>KnowBot Page</h1>
      <p>Check the console to see the data returned by usePage.</p>
    </div>
  );
};

export default KnowBot;