import Image from "next/image";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

// Deterministic hue from the name so the same person always gets the same
// placeholder color instead of a random one on every render.
function hueFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

export default function Avatar({
  name,
  photoUrl,
  className = "",
}: {
  name: string;
  photoUrl?: string | null;
  className?: string;
}) {
  if (photoUrl) {
    return (
      <Image
        src={photoUrl}
        alt={name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className={`object-cover ${className}`}
      />
    );
  }

  const hue = hueFor(name);
  return (
    <div
      className={`flex h-full w-full items-center justify-center font-heading text-3xl font-bold text-white ${className}`}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 55% 38%), hsl(${hue} 55% 22%))` }}
    >
      {initials(name) || "?"}
    </div>
  );
}
