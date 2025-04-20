export default function Container({ children, className }) {
  return (
    <section className={`relative pt-24 lg:pt-36 2xl:pt-44 ${className}`}>
      {children}
    </section>
  );
}
