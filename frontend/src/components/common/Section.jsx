export default function Section({
  children,
  className = "",
  id,
}) {
  return (
    <section
      id={id}
      className={`py-24 py-28 lg:py-36 ${className}`}
    >
      {children}
    </section>
  );
}