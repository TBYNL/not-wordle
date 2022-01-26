import React from 'react';
import { animated, useSpring } from '@react-spring/web'

export const FadeIn = ({ delay, children }) => {
  const styles = useSpring({ 
    delay: delay,
    from: { opacity: 0 },
    to: {
      opacity: 1
    },
    config: {
      duration: 600
    }
  })

  return <animated.div style={styles}>{children}</animated.div>
}