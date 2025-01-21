import React, { useRef, useEffect } from 'react';

const useHorizontalDrag = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const attachDragHandlers = React.useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDownHandler = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => {
      isDown = false;
    };

    slider.addEventListener('mousedown', mouseDownHandler);
    slider.addEventListener('mousemove', mouseMoveHandler);
    slider.addEventListener('mouseup', mouseUpHandler);
    slider.addEventListener('mouseleave', mouseUpHandler);

    return () => {
      slider.removeEventListener('mousedown', mouseDownHandler);
      slider.removeEventListener('mousemove', mouseMoveHandler);
      slider.removeEventListener('mouseup', mouseUpHandler);
      slider.removeEventListener('mouseleave', mouseUpHandler);
    };
  }, []);

  return { sliderRef, attachDragHandlers };
};

export default useHorizontalDrag;
