import React from 'react';
import './index.css';
import List from './List'

const App = () => {
	const children = [];  
  for(let i = 0; i < 3; i++) {
    children.push(<List key={i} />);
  }

	return (
		<div className='app-background'>
			{children}
		</div>
	);
};

export default App;
