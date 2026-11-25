import { useEffect, useRef, useState } from 'react';

export default function useSeatDrag(viewport, onDrop) {
  const pointer = useRef(null);
  const suppressClick = useRef(false);
  const [preview, setPreview] = useState(null);
  const scrollFrame = useRef(null);
  useEffect(() => () => cancelAnimationFrame(scrollFrame.current), []);

  function destination(x, y, source) {
    const seat = document.elementFromPoint(x, y)?.closest('[data-seat-index]');
    if (!seat || !viewport.current?.contains(seat)) return null;
    const index = Number(seat.dataset.seatIndex);
    return index === source ? null : index;
  }

  function finish(event, drop) {
    const drag = pointer.current;
    if (!drag || event.pointerId !== drag.id) return;
    pointer.current = null;
    cancelAnimationFrame(scrollFrame.current);
    setPreview(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!drag.active) return;
    suppressClick.current = true;
    const target = drop ? destination(event.clientX, event.clientY, drag.source) : null;
    if (target != null) onDrop(drag.source, target);
  }

  function scrollNearEdge() {
    const drag = pointer.current;
    const area = viewport.current;
    if (!drag?.active || !area) return;
    const rect = area.getBoundingClientRect();
    const { x, y, source } = drag;
    const edgeSpeed = (position, start, end) => position < start + 26 ? -8 : position > end - 26 ? 8 : 0;
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      const left = area.scrollLeft;
      const top = area.scrollTop;
      area.scrollBy(edgeSpeed(x, rect.left, rect.right), edgeSpeed(y, rect.top, rect.bottom));
      if (left !== area.scrollLeft || top !== area.scrollTop) {
        setPreview({ source, x, y, target: destination(x, y, source) });
      }
    }
    scrollFrame.current = requestAnimationFrame(scrollNearEdge);
  }

  return {
    preview,
    handlers(source, click) {
      return {
        onPointerDown(event) {
          if (event.button !== 0 || !event.isPrimary || pointer.current) return;
          suppressClick.current = false;
          pointer.current = { source, id: event.pointerId, x: event.clientX, y: event.clientY, active: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        },
        onPointerMove(event) {
          const drag = pointer.current;
          if (!drag || event.pointerId !== drag.id) return;
          const { clientX: x, clientY: y } = event;
          if (!drag.active && Math.hypot(x - drag.x, y - drag.y) < 7) return;
          if (!drag.active) {
            drag.active = true;
            scrollFrame.current = requestAnimationFrame(scrollNearEdge);
          }
          Object.assign(drag, { x, y });
          setPreview({ source, x, y, target: destination(x, y, source) });
        },
        onPointerUp: (event) => finish(event, true),
        onPointerCancel: (event) => finish(event, false),
        onLostPointerCapture: (event) => finish(event, false),
        onKeyDown(event) {
          if (event.key === 'Escape' && pointer.current) {
            event.currentTarget.releasePointerCapture(pointer.current.id);
            event.stopPropagation();
          }
        },
        onClick(event) {
          if (suppressClick.current && event.detail > 0) {
            suppressClick.current = false;
            return;
          }
          click(event);
        },
      };
    },
  };
}
