import { useRef, useState, useCallback } from "react";

export function useDraggable(containerRef: React.RefObject<HTMLDivElement>) {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    startXRef.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 2;
      containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    },
    [isDragging]
  );

  return {
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  };
}
