import React from 'react';
import { animated, useSpring } from '@react-spring/web'

export const Flip = ({ delay, animate, children, ...props }) => {
  const springProps = useSpring({
    delay: delay,
    from: { rotateX: 0, scale: 1 },
    to: { rotateX: animate ? 360 : 0, },
    config: { duration: 500 }
  });

  return (
    <animated.div
      style={springProps}
      {...props}
    >
      {children}
    </animated.div>
  );
};
