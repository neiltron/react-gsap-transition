'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
  }

  _createClass(_default, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._setupAnimation();
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(cb) {
      this._animateEnter(cb);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(cb) {
      this._animateEnter(cb);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(cb) {
      this._animateLeave(cb);
    }
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave() {
      this.props.onComplete();
    }
  }, {
    key: '_setupAnimation',
    value: function _setupAnimation() {
      var opts = this.state.animationOpts;

      this.anim = {
        staggerSpeed: opts.staggerSpeed || 0.05,
        entireDelay: opts.entireDelay || 0, // delay start of entire animation group after pageload
        speedIn: opts.speedIn || 0.25,
        speedOut: opts.speedOut || 0.15,
        easeIn: opts.easeIn || Circ.easeIn,
        easeOut: opts.easeOut || Circ.easeInOut
      };

      // sweet maths. mimics `staggerTo`.
      this.anim.stagger = this.props.index * this.anim.staggerSpeed + this.anim.entireDelay;
      this.anim.leaveIndex = this.props.total - this.props.index;

      // flip it and reverse it. thx missy
      this.anim.finishedDelay = (this.props.total - this.props.index) * this.anim.staggerSpeed + this.anim.speedOut;
    }
  }, {
    key: '_animateEnter',
    value: function _animateEnter(callback) {
      _gsap2['default'].set(this.refs.el, this.state.animationOpts.beforeEnter);

      _gsap2['default'].to(this.refs.el, this.anim.speedIn, Object.assign(this.state.animationOpts.enterAnimation, {
        ease: this.anim.easeIn,
        delay: this.anim.stagger,
        onComplete: callback
      }));
    }
  }, {
    key: '_animateLeave',
    value: function _animateLeave(callback) {
      var tl = new TimelineMax();

      // second `.to` attempts to have all animations finish at the same time.
      // this prevents dom elements from being removed so layout isn't affected
      // until the entire animation is complete
      tl.to(this.refs.el, this.anim.speedOut, Object.assign(this.state.animationOpts.leaveAnimation, {
        ease: this.anim.easeOut,
        delay: this.anim.stagger
      })).to(this.refs.el, 0, {
        delay: this.anim.finishedDelay,
        onComplete: callback
      });
    }
  }]);

  return _default;
})(_react2['default'].Component);

exports['default'] = _default;
module.exports = exports['default'];