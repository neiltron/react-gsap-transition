import React from 'react'
import TweenMax from 'gsap';

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount  ()   { this._setupAnimation(); }
  componentWillAppear (cb) { this._animateEnter(cb) }
  componentWillEnter  (cb) { this._animateEnter(cb) }
  componentWillLeave  (cb) { this._animateLeave(cb) }
  componentDidLeave   ()   { this.props.onComplete(); }

  _setupAnimation() {
    let opts = this.state.animationOpts;

    this.anim = {
      staggerSpeed: opts.staggerSpeed || 0.05,
      entireDelay:  opts.entireDelay  || 0,  // delay start of entire animation group after pageload
      speedIn:      opts.speedIn      || 0.25,
      speedOut:     opts.speedOut     || 0.15,
      easeIn:       opts.easeIn       || Circ.easeIn,
      easeOut:      opts.easeOut      || Circ.easeInOut
    }

    // sweet maths. mimics `staggerTo`.
    this.anim.stagger = this.props.index * this.anim.staggerSpeed + this.anim.entireDelay;
    this.anim.leaveIndex = this.props.total - this.props.index;

    // flip it and reverse it. thx missy
    this.anim.finishedDelay = (
      (this.props.total - this.props.index) *
      this.anim.staggerSpeed + this.anim.speedOut
    )
  }

  _animateEnter(callback) {
    TweenMax.set(this.refs.el, this.state.animationOpts.beforeEnter);

    TweenMax.to(
      this.refs.el,
      this.anim.speedIn,
      Object.assign(
        this.state.animationOpts.enterAnimation,
        {
          ease:       this.anim.easeIn,
          delay:      this.anim.stagger,
          onComplete: callback
        }
      )
    )
  }

  _animateLeave(callback) {
    let tl = new TimelineMax();

    // second `.to` attempts to have all animations finish at the same time.
    // this prevents dom elements from being removed so layout isn't affected
    // until the entire animation is complete
    tl
      .to(
        this.refs.el,
        this.anim.speedOut,
        Object.assign(
          this.state.animationOpts.leaveAnimation,
          {
            ease:       this.anim.easeOut,
            delay:      this.anim.stagger
          }
        )
      )
      .to(this.refs.el, 0, {
        delay:      this.anim.finishedDelay,
        onComplete: callback
      })
  }
}