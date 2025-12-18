import useWindowStore from "#store/window.ts";
import { useLayoutEffect, useRef, type ComponentType } from "react";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import type { WINDOW_CONFIG } from "#constants";

type WindowKeyType = keyof typeof WINDOW_CONFIG;

const WindowWrapper = (Component: ComponentType, windowKey: WindowKeyType) => {
  const Wrapped = (props: object) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef<HTMLDivElement>(null);

    // window opening logic
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";
        // opening animation
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
      }
      // closing animation not working coz every window opens when refreshing
      // else {
      //   // closing animation
      //   gsap.to(el, {
      //     scale: 0.8,
      //     opacity: 0,
      //     y: 40,
      //     duration: 0.4,
      //     ease: "power3.in",
      //     onComplete: () => {
      //       el.style.display = "none";
      //     },
      //   });
      // }
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

      if (!isOpen) {
        el.style.display = "none";
      }
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
