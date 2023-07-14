<template>
  <view>
    <view
      class="ball-wrap"
      v-for="(item, k) of balls"
      :key="k"
      :style="{
        opacity: item.show,
        top: item.start.y + 'px',
        left: item.start.x + 'px',
        transitionDuration: (item.show ? duration / 1000 : 0) + 's',
        'transition-timing-function': xTimeFunction[!item.ani ? 0 : 1],
        transform: 'translate3d(' + item.offset.x + 'px,0,0)',
        zIndex
      }"
    >
      <view
        class="ball"
        :class="{ ball3d: is3dSheet }"
        :style="{
          marginLeft: -size / 2 + 'px',
          marginTop: -size / 2 + 'px',
          padding: size + 'px',
          backgroundImage: ballImage,
          backgroundColor: ballColor,
          transitionDuration: (item.show ? duration / 1000 : 0) + 's',
          transform: 'translate3d(0,' + item.offset.y + 'px,0)',
          'transition-timing-function': yTimeFunction[item.ani ? 0 : 1]
        }"
      />
    </view>
  </view>
</template>

<script lang="ts">
// 节流函数
function debounce(func: any, delay: any, context: any) {
  return function () {
    func.id && clearTimeout(func.id)
    func.id = setTimeout(() => {
      func.apply(context, arguments)
    }, delay)
  }
}
export default {
  props: {
    size: {
      type: Number,
      default: 8
    },
    //3D
    is3dSheet: {
      type: Boolean,
      default: true
    },
    endPos: {
      type: Object,
      default() {
        return {
          x: 150,
          y: 150
        }
      }
    },
    //持续时间
    duration: {
      type: Number,
      default: 700
    },
    zIndex: {
      type: Number,
      default: 9999
    },
    ballImage: {
      type: String,
      default: ''
    },
    ballColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      balls: [],
      xTimeFunction: ['ease-in', 'ease-out'],
      yTimeFunction: ['cubic-bezier(0.23,-0.1, 0.84,-0.01)', 'cubic-bezier(0, 0.59, 0.46, 2.15)']
    } as any
  },
  mounted() {
    this.initBalls()
  },
  methods: {
    drop(pos: any) {
      let ball: any = null
      let duration = this.duration
      for (var i = 0; i < this.balls.length; i++) {
        if (this.balls[i].show) {
          continue
        }
        ball = this.balls[i]
      }
      ball.start.x = pos.x
      ball.start.y = pos.y
      ball.offset.x = this.endPos.x - pos.x
      ball.offset.y = this.endPos.y - pos.y
      if (ball.offset.y > 0) {
        ball.ani = 1
      } else {
        ball.ani = 0
      }
      ball.show = 1

      // 无限加载
      this.balls.push({
        show: 0,
        start: {
          x: 0,
          y: 0
        },
        offset: {
          x: 0,
          y: 0
        },
        ani: 0
      })
      if (ball.offset.y < 120) {
        //y低于120时加速的代码
      }
      setTimeout(() => {
        ball.show = 0
      }, duration)
      debounce(this.initBalls, duration + 200, this)()
    },
    initBalls() {
      const balls = []
      // 解决微信自带浏览器渲染慢问题，先加载几个
      for (var i = 0; i < 3; i++) {
        const ball = {
          show: 0,
          start: {
            x: 0,
            y: 0
          },
          offset: {
            x: 0,
            y: 0
          },
          ani: 0
        }
        balls.push(ball)
      }
      this.balls = balls
    }
  }
}
</script>

<style lang="scss" scoped>
.ball-wrap {
  position: fixed;
  z-index: 999;
  pointer-events: none;
  transform: translateZ(0);
  transition-property: transform;

  .ball {
    width: 0;
    height: 0;
    padding: 40rpx;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 40rpx;
    transform: translateZ(0);
    transition-property: transform opacity;

    &.ball3d {
      position: relative;

      &::after {
        position: absolute;
        top: -15rpx;
        right: -15rpx;
        bottom: -15rpx;
        left: -15rpx;
        display: block;
        background-image: radial-gradient(30% 30%, white, transparent, black);
        background-position: -5rpx -5rpx;
        background-repeat: no-repeat;
        background-size: 100%;
        content: '';
        opacity: 0.35;
      }
    }
  }
}
</style>
