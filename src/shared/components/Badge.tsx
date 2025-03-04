interface BadgeProps {
  text: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, className = "" }) => {
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${className}`}>
      {text}
    </span>
  );
};
