# react图片缩放组件


### npm i lxq-react-zoom -S
```jsx
import React from 'react';
import ZoomImg from 'lxq-react-zoom';

class Demo extends React.Component {
    render() {
        return (
           <ZoomImg 
                original="https://img.alicdn.com/tfs/TB1Jq7qmbSYBuNjSspiXXXNzpXa-1024-768.jpg" src="https://img.alicdn.com/tfs/TB1_ME1mf5TBuNjSspcXXbnGFXa-250-187.jpg"  
            />
        )
    }
}
// original 放大显示的原图
// src 小图
```

