import twemoji from "twemoji";

interface EmojiProps {
  className?: string;
  label?: string;
  symbol: string;
  size?: number;
}

export default function Emoji({
  className,
  symbol,
  label,
  size = 24,
}: EmojiProps) {
  const emojiMarkup = twemoji.parse(symbol, {
    folder: "svg",
    ext: ".svg",
    attributes: () => ({
      class: "emoji",
      style: `width: ${size}px; height: ${size}px;`,
      "aria-label": label ? label : "",
      role: "img",
      "aria-hidden": label ? "false" : "true",
    }),
  });

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: emojiMarkup }}
    />
  );
}
