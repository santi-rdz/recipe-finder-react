export default function TextHighlight({ children, color, className }) {
  return (
    <span
      className={`${className} relative z-20 after:absolute after:left-0 after:-z-1 after:h-1/3 after:w-full after:rounded-md after:${color} after:content-['']`}
    >
      {children}
    </span>
  );
}
