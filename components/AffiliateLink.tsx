import { ExternalLink } from "lucide-react";

export default function AffiliateLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent-dark transition-colors hover:bg-accent/20"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}
