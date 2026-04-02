type FAQ = {
  question: string;
  answer: string;
};

export default function FAQSection({
  faqs,
  city,
}: {
  faqs: FAQ[];
  city?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="mb-6 text-2xl font-bold text-navy-900">
        Frequently Asked Questions
        {city ? ` About Mobile Detailing in ${city}` : ""}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-xl border border-gray-200 bg-white"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-left font-semibold text-navy-900 transition-colors hover:text-accent-dark [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span className="ml-4 shrink-0 text-gray-400 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
