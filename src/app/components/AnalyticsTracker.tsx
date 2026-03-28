import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { api } from "../services/api";

export function AnalyticsTracker() {
  const location = useLocation();
  const scrollTresholds = useRef(new Set([25, 50, 75, 100]));
  const sectionObservers = useRef<Record<string, { start: number; active: boolean }>>({});

  useEffect(() => {
    // 1. Page View Tracking
    const isArticle = location.pathname.startsWith("/artikel/");
    api.logAnalytics({
      category: isArticle ? "content" : "traffic",
      action: "view",
      label: location.pathname,
    });

    // Reset scroll tracking on page change
    scrollTresholds.current = new Set([25, 50, 75, 100]);
  }, [location.pathname]);

  useEffect(() => {
    // 2. Scroll Depth Tracking
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = "scrollTop";
      const sh = "scrollHeight";
      const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

      scrollTresholds.current.forEach((t) => {
        if (percent >= t) {
          api.logAnalytics({
            category: "behavior",
            action: "scroll",
            value: t,
            label: `scroll_${t}%`,
          });
          scrollTresholds.current.delete(t);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // 3. Section Dwell Time Tracking (using Intersection Observer)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id || entry.target.getAttribute("data-section");
          if (!sectionId) return;

          if (entry.isIntersecting) {
            // Started viewing section
            sectionObservers.current[sectionId] = {
              start: Date.now(),
              active: true,
            };
          } else {
            // Stopped viewing section
            const context = sectionObservers.current[sectionId];
            if (context && context.active) {
              const duration = (Date.now() - context.start) / 1000;
              if (duration > 2) { // Only log if viewed for more than 2 seconds
                api.logAnalytics({
                  category: "behavior",
                  action: "dwell",
                  label: sectionId,
                  value: duration,
                });
              }
              context.active = false;
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of section is visible
    );

    // Observe all sections with 'data-analytics' attribute
    const sections = document.querySelectorAll("[data-analytics]");
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}
