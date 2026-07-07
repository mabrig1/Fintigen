export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 px-4 py-16 text-center text-white sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
        {eyebrow}
      </p>
      <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-brand-100/90">{description}</p>
    </section>
  );
}
