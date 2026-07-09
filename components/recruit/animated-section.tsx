"use client";

import { motion, useInView, type MotionProps } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { revealViewport } from "@/lib/animations";

function useRevealOnScrollUp() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, revealViewport);
  const [visible, setVisible] = useState(false);
  const scrollDir = useRef<"up" | "down">("down");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current) scrollDir.current = "down";
      else if (y < lastY.current) scrollDir.current = "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      setVisible(true);
      return;
    }
    if (scrollDir.current === "up") {
      setVisible(false);
    }
  }, [isInView]);

  return { ref, visible };
}

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
} & MotionProps;

export function AnimatedSection({
  id,
  className,
  children,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section id={id} className={className} initial={false} {...props}>
      {children}
    </motion.section>
  );
}

type RevealBlockProps = {
  className?: string;
  children: ReactNode;
  variants?: MotionProps["variants"];
  delay?: number;
  as?: "div" | "article";
};

function RevealBlock({
  className,
  children,
  variants,
  delay = 0,
  as = "div",
}: RevealBlockProps) {
  const { ref, visible } = useRevealOnScrollUp();
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

export function InViewBlock(props: RevealBlockProps) {
  return <RevealBlock {...props} />;
}

export function ScrollReveal(props: RevealBlockProps) {
  return <RevealBlock {...props} />;
}
