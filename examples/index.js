import React from 'react';
import { render } from 'react-dom';
import BigImg from '../src';
import './main.css'
class LookBigImgDemo extends React.Component {
    render() {
        return (
            <BigImg original="https://img.alicdn.com/tfs/TB1Jq7qmbSYBuNjSspiXXXNzpXa-1024-768.jpg" src="https://img.alicdn.com/tfs/TB1_ME1mf5TBuNjSspcXXbnGFXa-250-187.jpg" />
        );
    }
}

render (
	<LookBigImgDemo />,
	document.getElementById('app')
)