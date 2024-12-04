export const COMMON_STYLES = {
  container: "max-w-screen-xl mx-auto px-4",
  skeletonBase: "bg-neutral-800 rounded animate-pulse",
  card: "bg-neutral-900 p-4 rounded-lg",
  textMuted: "text-neutral-500",
  textPrimary: "text-neutral-200",
  flexBetween: "flex justify-between items-center",
  gridLayout: "grid grid-cols-1 lg:grid-cols-3 gap-6",
} as const;

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
} as const;
