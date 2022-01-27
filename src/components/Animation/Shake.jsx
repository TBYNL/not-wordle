import React from 'react';
import { animated, useSpring } from '@react-spring/web'

export const Shake = ({ animate, children, ...props }) => {
  const { x } = useSpring({
    from: { x: -1 },
    x: animate ? 1 : 0,
    config: { mass: 12, tension: 10000, friction: 80 },
  });
  return (
    <animated.div
      style={{
        transformOrigin: 'center center',
        transform: animate && x
          .to({
            range: [0, 0.5, 1],
            output: [0, 2, 0],
          })
          .to((x) => `rotate(${x}deg)`),
      }}
      {...props}
    >
      {children}
    </animated.div>
  );
};