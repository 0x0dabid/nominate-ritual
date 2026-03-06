export const ROLES = [
  {
    name: "Radiant Ritualist",
    color: "gold",
    emoji: "👑",
    tagline: "Golden Ritualist — extremely rare",
    description:
      "Perks to nominal comfort — extremely rare and used up for commons.",
    perks: ["Highest community honor", "Legit & rare status within the Ritual"],
    gradient: "from-yellow-600/30 to-amber-900/30",
    border: "border-yellow-500/50",
    glow: "shadow-yellow-500/20",
    text: "text-yellow-400",
    bg: "bg-yellow-500",
  },
  {
    name: "Ritualist",
    color: "green",
    emoji: "🐉",
    tagline: "Let the Ritual Begin",
    description:
      "Recognized Ritualist maintaining status through active community activities.",
    perks: [
      "Elevated Rituals on mints",
      "Elevated nomination recognition in the ecosystem",
    ],
    gradient: "from-emerald-600/30 to-green-900/30",
    border: "border-emerald-500/50",
    glow: "shadow-emerald-500/20",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
  },
  {
    name: "ritty",
    color: "purple",
    emoji: "🔮",
    tagline: "Loyal community member",
    description:
      "Berkis community core roles. Be the establishment of streaming access.",
    perks: ["Exclusive Telegram group", "Access to the Ritualist access"],
    gradient: "from-purple-600/30 to-violet-900/30",
    border: "border-purple-500/50",
    glow: "shadow-purple-500/20",
    text: "text-purple-400",
    bg: "bg-purple-500",
  },
  {
    name: "ritty bitty",
    color: "blue",
    emoji: "💎",
    tagline: "Little bitty baby Ritualist",
    description:
      "Perks that bring gentle access. One step towards greatness of the Ritual.",
    perks: ["Access to Ritual Channel", "Access to higher honor"],
    gradient: "from-blue-600/30 to-indigo-900/30",
    border: "border-blue-500/50",
    glow: "shadow-blue-500/20",
    text: "text-blue-400",
    bg: "bg-blue-500",
  },
] as const;

export type RoleName = (typeof ROLES)[number]["name"];
