import React from 'react';
import { render } from 'react-dom';

function setStyles(element, styles) {
	for (const prop in styles) {
		element.style[prop] = styles[prop];
	}
}

class BigImg extends React.Component {
	constructor(props) {
		super(props);
		this.imgClick = this.imgClick.bind(this);
		this.hidden = this.hidden.bind(this);
		this._scaleBase = 0.6;
	}
	imgClick(e) {
		const me = this;
		const target = e.target;
		const targetPos = target.getBoundingClientRect();
		this.bigImgStyle = {
			width: targetPos.width + 'px',
			height: targetPos.height + 'px',
			left: targetPos.left + 'px',
			top: targetPos.top + 'px',
			position: 'absolute',
			transition: 'all 300ms',
			cursor: 'zoom-out',
		};
		if (!this._body) {
			this._body = document.getElementsByTagName('body')[0];
		}
		this._body.style.overflow = 'hidden';
		const imgBox = {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 44444,
			background: "rgba(0,0,0,0.6)",
		};
		this.bigPos = document.createElement('div');
		setStyles(this.bigPos, imgBox);

		this.img = document.createElement('img');
		this.img.src = this.props.src;
		setStyles(this.img, this.bigImgStyle);

		this.bigPos.appendChild(this.img);

		this.bigPos.addEventListener('click', me.hidden);

		this._body.appendChild(this.bigPos);

		this.backOpacity = document.createElement('div');

		// this.backOpacity.className = 'big-img-pos';
		// const bigImgPos = {
		// 	position: 'fixed',
		// 	top: 0,
		// 	left: 0,
		// 	bottom: 0,
		// 	right: 0,
		// 	zIndex: 3333,
		// 	background: "rgba(0,0,0,0.6)",
		// 	transition: "all 300ms",
		// 	opacity: 0,
		// }
		// setStyles(this.backOpacity, bigImgPos);

		this.close = document.createElement('span');
		// this.close.className = 'closeBig';
		const closeStyle = {
			position: "absolute",
			top: "10px",
			right: "20px",
			color: "#fff",
			fontSize: "21px",
			cursor: "pointer",
		}
		this.backOpacity.appendChild(this.close);
		// this.close.addEventListener('click', me.hidden);

		this._body.appendChild(this.backOpacity);
		// 计算放大系数
		const windowCenter = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		};
		const imgHalfWidth = targetPos.width / 2;
		const imgHalfHeight = targetPos.height / 2;
  
		const imgCenter = {
			x: targetPos.left + imgHalfWidth,
			y: targetPos.top + imgHalfHeight,
		};
		const translate = {
			x: windowCenter.x - imgCenter.x,
			y: windowCenter.y - imgCenter.y,
		};
		const distFromImageEdgeToWindowEdge = {
			x: windowCenter.x - imgHalfWidth,
			y: windowCenter.y - imgHalfHeight,
		};
		const scaleHorizontally = distFromImageEdgeToWindowEdge.x / imgHalfWidth;
		const scaleVertically = distFromImageEdgeToWindowEdge.y / imgHalfHeight;
		const scale = this._scaleBase + Math.min(scaleHorizontally, scaleVertically);
		const transformImg = 'translate(' + translate.x + 'px,' + translate.y + 'px) ' +
		'scale(' + scale + ',' + scale + ')';
		setTimeout(() => {
			this.img.style.transform = transformImg;
			this.backOpacity.style.opacity = 1;
			this.img.src = this.props.original;
		}, 30);
	}
	hidden() {
		this.img.style.transform = 'none';
		this._body.style.overflow = 'auto';
		this.backOpacity.style.opacity = 0;
		this.img.addEventListener('transitionend', () => {
			this._body.removeChild(this.bigPos);
			this._body.removeChild(this.backOpacity);
			this.bigPos.removeEventListener('click', () => {});
			this.img.removeEventListener('transitionend', () => {});
			this.bigPos = null;
			this.img = null;
			this._body = null;
		});
	}
	render() {
		return (
			<img className="small" onClick={this.imgClick} alt="" src={this.props.src} />
		);
	}
}


export default BigImg;