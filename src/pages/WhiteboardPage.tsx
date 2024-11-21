import React from 'react';
import { useDispatch } from 'react-redux';
import { saveWhiteboardData } from '../store/whiteboardSlice';
import Whiteboard from '../components/Whiteboard';

const WhiteboardPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSave = (data: string) => {
    dispatch(saveWhiteboardData(data));
    console.log('Whiteboard data saved:', data);
  };

  return (
    <div>
      <h1>Whiteboard</h1>
      <Whiteboard onSave={handleSave} />
    </div>
  );
};

export default WhiteboardPage;
