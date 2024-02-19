"use client";

import { type PlotOptions, plot } from "@observablehq/plot";
import { useEffect, useRef } from "react";

export default function Plot({
  data,
  options,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  options: PlotOptions;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useEffect(() => {
    if (data == undefined) return;
    const p = plot(options);
    containerRef?.current?.append(p);
    return () => p.remove();
  }, [data, options]);

  return <div ref={containerRef} />;
}
