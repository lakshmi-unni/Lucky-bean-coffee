const FEATURES = [
  {
    title: 'Chosen By Hand',
    description: 'We taste-test every batch before it earns a spot in your cup',
    icon: (
      <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm0 0c2 2 2 4 0 6s-2 4 0 6" />
    ),
  },
  {
    title: 'Serious Baristas',
    description: 'Trained, caffeinated, and a little obsessed with getting it right',
    icon: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="m8.5 13.5-1.5 6 5-2.5 5 2.5-1.5-6" />
      </>
    ),
  },
  {
    title: 'One-Of-A-Kind Blends',
    description: "Recipes you won't find anywhere else in the capital",
    icon: (
      <>
        <path d="M5 8h11v5a5.5 5.5 0 0 1-5.5 5.5h0A5.5 5.5 0 0 1 5 13V8Z" />
        <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
        <path d="M8 4c0 1 1 1 1 2s-1 1-1 2" />
      </>
    ),
  },
  {
    title: 'No Catch, Just Coffee',
    description: "Great coffee shouldn't cost you your luck, or your salary",
    icon: (
      <>
        <path d="M6 6h9l4 4-9 9-9-9V6a0 0 0 0 1 0 0Z" transform="translate(2 0)" />
        <path d="M13 12h.01" />
      </>
    ),
  },
]

export default function WhyDifferent() {
  return (
    <section id="why" className="bg-cream-50">
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-4xl font-semibold text-coffee-700 md:text-5xl">
            Why Lucky Bean?
          </h2>
          <p className="mt-4 text-sm text-body-text">
            We don&apos;t just make your coffee, we make your luck.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`rounded-2xl p-6 text-center ${
                i === 0 ? 'bg-cream-200' : ''
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto h-10 w-10 text-coffee-700"
              >
                {feature.icon}
              </svg>
              <h3 className="mt-4 font-heading text-base font-semibold text-coffee-700">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs text-body-text">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-body-text">
            Some people find luck in a four-leaf clover.
          </p>
          <p className="mt-1 font-heading text-lg font-semibold text-coffee-700">
            We found ours in a coffee bean.
          </p>
          <a
            href="#contact"
            className="mt-5 inline-block rounded-full bg-gold-500 px-7 py-2.5 text-sm font-semibold text-coffee-900 transition hover:bg-gold-400"
          >
            Come Get Lucky
          </a>
        </div>
      </div>
    </section>
  )
}
