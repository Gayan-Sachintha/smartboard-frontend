import { useState } from 'react';

const useWhiteboard = () => {
  const [state, setState] = useState(null);
  return { state, setState };
};

export default useWhiteboard;
