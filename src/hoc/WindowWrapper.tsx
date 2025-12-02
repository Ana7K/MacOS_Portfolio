import useWindowStore from "#store/window.ts";
import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef<HTMLDivElement>(null);

    // window opening logic
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }, [isOpen]);

    // window dragging logic
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    }, []);

    // hiding all elements from the start unless clicking
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    // higher order component
    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"}`;

  return Wrapped;
};

export default WindowWrapper;
