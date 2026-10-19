import React from 'react';
import Greeting from './Greeting';
import TaskList from './TaskList';
import ActionButton from './ActionButton';
import ProfileCard from './ProfileCard';
import ImageGallery from './ImageGallery';

function App() {
  return (
    <div className="App">
      <Greeting />
      <TaskList />
      <ActionButton />
      <ProfileCard />
      <ImageGallery />
    </div>
  );
}

export default App;