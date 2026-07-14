export default function About() {
  return (
    <section id="about" className="bg-cream-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10">
        <div>
          <h2 className="font-heading text-4xl font-semibold text-coffee-700 md:text-5xl">
            The Story Behind Lucky Bean
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-body-text">
            It started with a single roast and a gut feeling. In 2019,
            Lakshmi swapped her office job for a one-room café on Al Bandar
            Street, betting everything on great coffee and Abu Dhabi&apos;s
            love for a good cup. Turns out, the gamble paid off. Today,
            Lucky Bean is where locals come for their daily dose of luck:
            freshly roasted Arabica, a team that remembers your order before
            you say it, and a little bit of magic in every mug.
          </p>
          <a
            href="#menu"
            className="mt-8 inline-block rounded-full border border-coffee-700 px-7 py-2.5 text-sm font-semibold text-coffee-700 transition hover:bg-coffee-700 hover:text-white"
          >
            Learn More
          </a>

          <div className="mt-10 rounded-2xl bg-cream-200 p-5">
            <p className="text-sm leading-relaxed text-coffee-700 italic">
              &ldquo;I named it Lucky Bean because opening this place was
              the best risk I ever took. Every cup we pour, I&apos;m
              hoping it&apos;s someone else&apos;s lucky break too.&rdquo;
            </p>
            <p className="mt-2 text-xs font-semibold text-coffee-700">
              Lakshmi &mdash; Founder &amp; Head Roaster
            </p>
          </div>
        </div>

        <div className="mx-auto">
          <img
            src="/owner-lakshmi.png"
            alt="Lakshmi, founder of Lucky Bean, roasting coffee beans at the Al Bateen café"
            className="aspect-[4/5] w-full max-w-sm rounded-2xl object-cover shadow-xl"
          />
          <p className="mt-3 text-center text-xs text-body-text">
            Lakshmi at the roaster, Al Bateen café
          </p>
        </div>
      </div>
    </section>
  )
}
