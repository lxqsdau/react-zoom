'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setStyles(element, styles) {
	for (var prop in styles) {
		element.style[prop] = styles[prop];
	}
}

var BigImg = function (_React$Component) {
	_inherits(BigImg, _React$Component);

	function BigImg(props) {
		_classCallCheck(this, BigImg);

		var _this = _possibleConstructorReturn(this, (BigImg.__proto__ || Object.getPrototypeOf(BigImg)).call(this, props));

		_this.imgClick = _this.imgClick.bind(_this);
		_this.hidden = _this.hidden.bind(_this);
		_this._scaleBase = 0.6;
		return _this;
	}

	_createClass(BigImg, [{
		key: 'imgClick',
		value: function imgClick(e) {
			var _this2 = this;

			var me = this;
			var target = e.target;
			var targetPos = target.getBoundingClientRect();
			this.bigImgStyle = {
				width: targetPos.width + 'px',
				height: targetPos.height + 'px',
				left: targetPos.left + 'px',
				top: targetPos.top + 'px',
				position: 'absolute',
				transition: 'all 300ms',
				cursor: 'zoom-out'
			};
			if (!this._body) {
				this._body = document.getElementsByTagName('body')[0];
			}
			this._body.style.overflow = 'hidden';
			var imgBox = {
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 44444,
				background: "rgba(0,0,0,0.6)"
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

			this.backOpacity.className = 'big-img-pos';
			var bigImgPos = {
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: 3333,
				background: "rgba(0,0,0,0.6)",
				transition: "all 300ms",
				opacity: 0
			};
			setStyles(this.backOpacity, bigImgPos);

			this.close = document.createElement('span');
			this.close.className = 'closeBig';
			var closeStyle = {
				position: "absolute",
				top: "10px",
				right: "20px",
				color: "#fff",
				fontSize: "21px",
				cursor: "pointer"
			};
			this.backOpacity.appendChild(this.close);
			// this.close.addEventListener('click', me.hidden);

			this._body.appendChild(this.backOpacity);
			// 计算放大系数
			var windowCenter = {
				x: window.innerWidth / 2,
				y: window.innerHeight / 2
			};
			var imgHalfWidth = targetPos.width / 2;
			var imgHalfHeight = targetPos.height / 2;

			var imgCenter = {
				x: targetPos.left + imgHalfWidth,
				y: targetPos.top + imgHalfHeight
			};
			var translate = {
				x: windowCenter.x - imgCenter.x,
				y: windowCenter.y - imgCenter.y
			};
			var distFromImageEdgeToWindowEdge = {
				x: windowCenter.x - imgHalfWidth,
				y: windowCenter.y - imgHalfHeight
			};
			var scaleHorizontally = distFromImageEdgeToWindowEdge.x / imgHalfWidth;
			var scaleVertically = distFromImageEdgeToWindowEdge.y / imgHalfHeight;
			var scale = this._scaleBase + Math.min(scaleHorizontally, scaleVertically);
			var transformImg = 'translate(' + translate.x + 'px,' + translate.y + 'px) ' + 'scale(' + scale + ',' + scale + ')';
			setTimeout(function () {
				_this2.img.style.transform = transformImg;
				_this2.backOpacity.style.opacity = 1;
				_this2.img.src = _this2.props.original;
			}, 30);
		}
	}, {
		key: 'hidden',
		value: function hidden() {
			var _this3 = this;

			this.img.style.transform = 'none';
			this._body.style.overflow = 'auto';
			this.backOpacity.style.opacity = 0;
			this.img.addEventListener('transitionend', function () {
				_this3._body.removeChild(_this3.bigPos);
				_this3._body.removeChild(_this3.backOpacity);
				_this3.bigPos.removeEventListener('click', function () {});
				_this3.img.removeEventListener('transitionend', function () {});
				_this3.bigPos = null;
				_this3.img = null;
				_this3._body = null;
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement('img', { className: 'small', onClick: this.imgClick, alt: '', src: this.props.src });
		}
	}]);

	return BigImg;
}(_react2.default.Component);

exports.default = BigImg;