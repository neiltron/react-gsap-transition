# react-gsap-transition
[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Dev Dependency Status][daviddm-dev-image]][daviddm-url]

Creates an easy bridge between ReactTransitionGroup and GSAP. This is specifically helpful with staggering a group of items in/out of view with a TweenMax-based tween on enter/leave.

If GSAP isn't a requirement for your project, you might be better off with something like [react-motion](https://github.com/chenglou/react-motion).

## Installation

```sh
$ npm install --save react-gsap-transition
```

## Usage

Setup the component child element that will be transitioning. All tween values are optional and should be added to the component state. In this example they are setup in `_animationOpts`.

Note the item being tweened should have a `ref` of `el`.

```js
import React from 'react'
import GSAPTransitionItem from 'react-gsap-transition'

export default class extends GSAPTransitionItem {
  constructor(props) {
    super(props)

    this.state = {
      animationOpts: this._animationOptions()
    }
  }

  render() {
    return (
      <div><span ref='el'>ITEM</span></div>
    )
  }

  _animationOptions() {
    return {
      staggerSpeed:   .1,
      beforeEnter:    { y: '-5%', opacity: 0 },
      enterAnimation: { y: '0%',  opacity: 1 },
      leaveAnimation: { y: '5%',  opacity: 0 }
    }
  }
}
```

And to use it, your parent component should look something like this:

```js
import React from 'react'
import MyTweenedComponent from 'my_tween_component.js'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = { leaving: false }
  }

  render() {
    return (
      <div onClick={this._onClick}>
        <ReactTransitionGroup>
          {this._items()}
        </ReactTransitionGroup>
      </div>
    )
  }

  _onClick() {
    this.setState({ leaving: !this.state.leaving })
  }

  _items() {
    let items = ['a', 'group', 'of', 'words']

    if (!this.state.leaving) {
      return items.map(item, i) {
        let onComplete = (i == items.length - 1) ? this._onComplete.bind(this) : () => {}

        <MyTweenedComponent
          text={item}
          key={item}
          index={i}
          total={items.length}
          onComplete={onComplete}
          />
      }
    }
  }
}
```
## License

MIT © [Neil Pullman](http://descend.org)


[npm-image]: https://badge.fury.io/js/react-gsap-transition.svg
[npm-url]: https://npmjs.org/package/react-gsap-transition
[daviddm-image]: https://david-dm.org/neiltron/react-gsap-transition.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/neiltron/react-gsap-transition
[daviddm-dev-image]: https://david-dm.org/neiltron/react-gsap-transition/dev-status.svg?theme=shields.io
