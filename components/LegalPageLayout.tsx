interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

/** Shared shell for the three legal pages — consistent heading + typography. */
export default function LegalPageLayout({ title, effectiveDate, children }: LegalPageLayoutProps) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-brand-500">Effective date: {effectiveDate}</p>
          <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-brand-700 sm:text-base [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-brand-900 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
