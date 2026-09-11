// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section
          className="
              relative
              isolate
              overflow-hidden
              bg-black
          "
      >

          {/* Background image */}
          <div
              className="
                  absolute
                  inset-0
                  -z-20
                  bg-[url('/money.jpg')]
                  bg-cover
                  bg-position-[65%_center]
                  bg-no-repeat
              "
          />

          {/* Readability overlay */}
          <div
              className="
                  absolute
                  inset-0
                  -z-10
                  bg-linear-to-r
                  from-black
                  via-black/50
                  to-white/20
              "
          />

          {/* Hero content */}
          <div
              className="
                  mx-auto
                  flex
                  min-h-[calc(100vh-4rem)]
                  w-full
                  max-w-7xl
                  items-center
                  px-4
                  py-16
                  sm:px-6
                  lg:px-8
              "
          >
              <div className="min-w-0 max-w-2xl">

                  {/* Eyebrow */}
                  <p
                      className="
                          text-body-sm
                          font-medium
                          uppercase
                          tracking-[0.2em]
                          text-greekvilla/75
                      "
                  >
                      AI Inflation Forecasting
                  </p>

                  {/* Heading */}
                  <h1
                      className="
                          mt-4
                          text-display
                          font-bold
                          leading-tight
                          tracking-tight
                          text-greekvilla
                      "
                  >
                      Understand the Future of Your <span className="text-brand">Money</span>
                  </h1>

                  {/* Description */}
                  <p
                      className="
                          mt-6
                          max-w-xl
                          text-body
                          leading-7
                          text-greekvilla/67
                      "
                  >
                      MoneyMonkey uses historical economic data and
                      machine learning to forecast future inflation
                      and estimate its impact on your money.
                  </p>

                  {/* Actions */}
                  <div
                      className="
                          mt-8
                          flex
                          flex-wrap
                          items-center
                          gap-3
                      "
                  >
                      <Link
                          href="/prediction"
                          className="
                              inline-flex
                              items-center
                              justify-center
                              rounded-md
                              bg-brand-500
                              px-5
                              py-3
                              text-body-sm
                              font-medium
                              text-black
                              transition
                              hover:bg-brand-400
                          "
                      >
                          Get Started
                      </Link>

                      <a
                          href="YOUR_YOUTUBE_VIDEO_URL"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-md
                              bg-white/80
                              px-5
                              py-3
                              text-body-sm
                              font-medium
                              text-black
                              backdrop-blur-sm
                              transition
                              hover:bg-white/90
                          "
                      >
                          <span aria-hidden="true">▶</span>
                          Watch Video
                      </a>
                  </div>

              </div>
          </div>

      </section>


      {/* How It Works */}
      <section
          id="how-it-works"
          className="
              border-t
              border-black/10
              bg-white
          "
      >
          <div
              className="
                  mx-auto
                  w-full
                  max-w-7xl
                  px-4
                  py-20
                  sm:px-6
                  lg:px-8
              "
          >
              {/* Section heading */}
              <div className="max-w-2xl">
                  <p
                      className="
                          text-body-sm
                          font-medium
                          uppercase
                          tracking-[0.2em]
                          text-brand-700
                      "
                  >
                      How It Works
                  </p>

                  <h2
                      className="
                          mt-3
                          text-h2
                          font-bold
                          leading-tight
                          tracking-tight
                          text-black
                      "
                  >
                      See where your money
                      <span className="text-brand-500"> could be headed.</span>
                  </h2>

                  <p
                      className="
                          mt-4
                          max-w-xl
                          text-body
                          leading-7
                          text-muted
                      "
                  >
                      MoneyMonkey turns historical inflation data into a
                      clearer picture of how your money may change over time.
                  </p>
              </div>

              {/* Process */}
              <div className="mt-14">

                  {/* Timeline */}
                  <div
                      className="
                          grid
                          gap-10
                          md:grid-cols-3
                          md:gap-0
                      "
                  >

                      {/* Step 01 */}
                      <div className="relative min-w-0 md:pr-10">

                          {/* Timeline */}
                          <div
                              className="
                                  mb-6
                                  flex
                                  items-center
                              "
                          >
                              <span
                                  className="
                                      flex
                                      h-11
                                      w-11
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-full
                                      bg-brand-500
                                      text-body-sm
                                      font-bold
                                      text-black
                                  "
                              >
                                  01
                              </span>

                              <div
                                  className="
                                      hidden
                                      h-px
                                      flex-1
                                      bg-black/15
                                      md:block
                                  "
                              />
                          </div>

                          <h3
                              className="
                                  text-h3
                                  font-semibold
                                  tracking-tight
                                  text-black
                              "
                          >
                              Enter your amount
                          </h3>

                          <p
                              className="
                                  mt-3
                                  max-w-sm
                                  text-body-sm
                                  leading-6
                                  text-muted
                              "
                          >
                              Start with the amount of money you want
                              to understand.
                          </p>
                      </div>


                      {/* Step 02 */}
                      <div className="relative min-w-0 md:px-5">

                          {/* Timeline */}
                          <div
                              className="
                                  mb-6
                                  flex
                                  items-center
                              "
                          >
                              <span
                                  className="
                                      flex
                                      h-11
                                      w-11
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-full
                                      bg-brand-500
                                      text-body-sm
                                      font-bold
                                      text-black
                                  "
                              >
                                  02
                              </span>

                              <div
                                  className="
                                      hidden
                                      h-px
                                      flex-1
                                      bg-black/15
                                      md:block
                                  "
                              />
                          </div>

                          <h3
                              className="
                                  text-h3
                                  font-semibold
                                  tracking-tight
                                  text-black
                              "
                          >
                              Forecast inflation
                          </h3>

                          <p
                              className="
                                  mt-3
                                  max-w-sm
                                  text-body-sm
                                  leading-6
                                  text-muted
                              "
                          >
                              MoneyMonkey analyzes historical inflation
                              patterns to estimate future changes.
                          </p>
                      </div>


                      {/* Step 03 */}
                      <div className="relative min-w-0 md:pl-5">

                          {/* Timeline */}
                          <div
                              className="
                                  mb-6
                                  flex
                                  items-center
                              "
                          >
                              <span
                                  className="
                                      flex
                                      h-11
                                      w-11
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-full
                                      bg-brand-500
                                      text-body-sm
                                      font-bold
                                      text-black
                                  "
                              >
                                  03
                              </span>
                          </div>

                          <h3
                              className="
                                  text-h3
                                  font-semibold
                                  tracking-tight
                                  text-black
                              "
                          >
                              See the future
                          </h3>

                          <p
                              className="
                                  mt-3
                                  max-w-sm
                                  text-body-sm
                                  leading-6
                                  text-muted
                              "
                          >
                              See how inflation could affect the future
                              value of your money.
                          </p>
                      </div>

                  </div>


                  {/* Financial visual */}
                  <div
                      className="
                          mt-16
                          overflow-hidden
                          rounded-xl
                          border
                          border-black/10
                          bg-black
                          p-6
                          sm:p-8
                      "
                  >
                      <div
                          className="
                              flex
                              flex-col
                              gap-8
                              lg:flex-row
                              lg:items-end
                              lg:justify-between
                          "
                      >

                          {/* Value */}
                          <div className="min-w-0">

                              <p
                                  className="
                                      text-body-sm
                                      uppercase
                                      tracking-[0.15em]
                                      text-white/50
                                  "
                              >
                                  Example
                              </p>

                              <div className="mt-3 flex items-baseline gap-2">
                                  <span
                                      className="
                                          truncate
                                          text-3xl
                                          font-bold
                                          tracking-tight
                                          text-white
                                          sm:text-4xl
                                      "
                                  >
                                      $100,000
                                  </span>

                                  <span
                                      className="
                                          shrink-0
                                          text-body-sm
                                          text-white/50
                                      "
                                  >
                                      today
                                  </span>
                              </div>

                              <p
                                  className="
                                      mt-2
                                      max-w-sm
                                      text-body-sm
                                      leading-6
                                      text-white/60
                                  "
                              >
                                  See how inflation may affect its
                                  purchasing power over time.
                              </p>

                          </div>


                          {/* Chart */}
                          <div
                              className="
                                  min-w-0
                                  flex-1
                                  lg:max-w-2xl
                              "
                          >
                              <div
                                  className="
                                      relative
                                      h-40
                                      w-full
                                  "
                              >

                                  {/* Horizontal guide lines */}
                                  <div
                                      className="
                                          absolute
                                          inset-x-0
                                          top-0
                                          border-t
                                          border-white/10
                                      "
                                  />

                                  <div
                                      className="
                                          absolute
                                          inset-x-0
                                          top-1/2
                                          border-t
                                          border-white/10
                                      "
                                  />

                                  <div
                                      className="
                                          absolute
                                          inset-x-0
                                          bottom-0
                                          border-t
                                          border-white/10
                                      "
                                  />

                                  {/* Chart line */}
                                  <svg
                                      viewBox="0 0 600 160"
                                      className="
                                          absolute
                                          inset-0
                                          h-full
                                          w-full
                                          overflow-visible
                                      "
                                      preserveAspectRatio="none"
                                  >
                                      <path
                                          d="
                                              M 0 25
                                              C 90 30, 120 42, 180 55
                                              S 280 75, 340 92
                                              S 450 112, 600 135
                                          "
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                          className="text-brand-500"
                                      />

                                      {/* End point */}
                                      <circle
                                          cx="600"
                                          cy="135"
                                          r="6"
                                          className="fill-brand-500"
                                      />
                                  </svg>

                                  {/* End value */}
                                  <div
                                      className="
                                          absolute
                                          bottom-0
                                          right-0
                                          translate-y-full
                                          pt-2
                                      "
                                  >
                                      <span
                                          className="
                                              text-body-sm
                                              font-semibold
                                              text-brand-500
                                          "
                                      >
                                          Future value
                                      </span>
                                  </div>

                              </div>

                              {/* Years */}
                              <div
                                  className="
                                      mt-8
                                      flex
                                      justify-between
                                      text-caption
                                      text-white/40
                                  "
                              >
                                  <span>2026</span>
                                  <span>2030</span>
                                  <span>2035</span>
                                  <span>2040</span>
                              </div>
                          </div>

                      </div>
                  </div>

              </div>
          </div>
      </section>


      {/* About MoneyMonkey */}
      <section
          id="about"
          className="
              border-t
              border-black/10
              bg-brand-50
          "
      >
          <div
              className="
                  mx-auto
                  w-full
                  max-w-7xl
                  px-4
                  py-20
                  sm:px-6
                  lg:px-8
              "
          >
              <div
                  className="
                      grid
                      gap-14
                      lg:grid-cols-2
                      lg:items-center
                      lg:gap-20
                  "
              >

                  {/* Text */}
                  <div className="min-w-0">

                      <p
                          className="
                              text-body-sm
                              font-medium
                              uppercase
                              tracking-[0.2em]
                              text-brand-700
                          "
                      >
                          About MoneyMonkey
                      </p>

                      <h2
                          className="
                              mt-3
                              max-w-xl
                              text-h2
                              font-bold
                              leading-tight
                              tracking-tight
                              text-black
                          "
                      >
                          Inflation is easy to overlook.
                          <span className="block text-brand-600">
                              Its impact isn&apos;t.
                          </span>
                      </h2>

                      <p
                          className="
                              mt-6
                              max-w-xl
                              text-body
                              leading-7
                              text-muted
                          "
                      >
                          MoneyMonkey was built to make the future impact
                          of inflation easier to understand.
                      </p>

                      <p
                          className="
                              mt-4
                              max-w-xl
                              text-body-sm
                              leading-6
                              text-muted
                          "
                      >
                          By combining historical economic data with
                          machine learning, MoneyMonkey helps turn
                          complicated inflation patterns into a clearer
                          picture of how your money may change over time.
                      </p>

                      {/* Technology line */}
                      <div
                          className="
                              mt-8
                              border-t
                              border-black/10
                              pt-6
                          "
                      >
                          <p
                              className="
                                  text-caption
                                  font-medium
                                  uppercase
                                  tracking-[0.15em]
                                  text-black/50
                              "
                          >
                              Built as a full-stack forecasting platform
                          </p>

                          <div
                              className="
                                  mt-3
                                  flex
                                  flex-wrap
                                  gap-x-5
                                  gap-y-2
                                  text-body-sm
                                  font-medium
                                  text-black
                              "
                          >
                              <span>Web Application</span>
                              <span className="text-black/20">/</span>
                              <span>Backend API</span>
                              <span className="text-black/20">/</span>
                              <span>Machine Learning</span>
                          </div>
                      </div>

                  </div>


                  {/* Visual */}
                  <div
                      className="
                          relative
                          min-w-0
                      "
                  >
                      <div
                          className="
                              relative
                              overflow-hidden
                              rounded-2xl
                              bg-black
                              p-6
                              sm:p-8
                          "
                      >

                          {/* Header */}
                          <div
                              className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-4
                              "
                          >
                              <div className="min-w-0">

                                  <p
                                      className="
                                          text-caption
                                          uppercase
                                          tracking-[0.15em]
                                          text-white/40
                                      "
                                  >
                                      Purchasing power
                                  </p>

                                  <p
                                      className="
                                          mt-2
                                          text-body-sm
                                          text-white/60
                                      "
                                  >
                                      Example over time
                                  </p>

                              </div>

                              <span
                                  className="
                                      shrink-0
                                      rounded-full
                                      bg-brand-500
                                      px-3
                                      py-1
                                      text-caption
                                      font-semibold
                                      text-black
                                  "
                              >
                                  Inflation
                              </span>
                          </div>


                          {/* Amount */}
                          <div className="mt-10">

                              <p
                                  className="
                                      text-4xl
                                      font-bold
                                      tracking-tight
                                      text-white
                                      sm:text-5xl
                                  "
                              >
                                  $100,000
                              </p>

                              <p
                                  className="
                                      mt-2
                                      text-body-sm
                                      text-white/50
                                  "
                              >
                                  Starting value
                              </p>

                          </div>


                          {/* Visual chart */}
                          <div className="mt-10">

                              <div
                                  className="
                                      relative
                                      h-40
                                      w-full
                                  "
                              >

                                  {/* Grid */}
                                  <div
                                      className="
                                          absolute
                                          inset-x-0
                                          top-0
                                          border-t
                                          border-white/10
                                      "
                                  />

                                  <div
                                      className="
                                          absolute
                                          inset-x-0
                                          top-1/2
                                          border-t
                                          border-white/10
                                      "
                                  />

                                  <div
                                      className="
                                          absolute
                                          inset-x-0
                                          bottom-0
                                          border-t
                                          border-white/10
                                      "
                                  />

                                  {/* Curve */}
                                  <svg
                                      viewBox="0 0 600 160"
                                      className="
                                          absolute
                                          inset-0
                                          h-full
                                          w-full
                                      "
                                      preserveAspectRatio="none"
                                  >
                                      <path
                                          d="
                                              M 0 20
                                              C 90 25, 120 35, 180 50
                                              S 290 70, 350 90
                                              S 470 110, 600 135
                                          "
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                          className="text-brand-500"
                                      />

                                      <circle
                                          cx="600"
                                          cy="135"
                                          r="6"
                                          className="fill-brand-500"
                                      />
                                  </svg>

                              </div>

                              {/* Years */}
                              <div
                                  className="
                                      mt-4
                                      flex
                                      justify-between
                                      text-caption
                                      text-white/40
                                  "
                              >
                                  <span>2026</span>
                                  <span>2030</span>
                                  <span>2035</span>
                                  <span>2040</span>
                              </div>

                          </div>


                          {/* Bottom message */}
                          <div
                              className="
                                  mt-8
                                  border-t
                                  border-white/10
                                  pt-5
                              "
                          >
                              <p
                                  className="
                                      text-body-sm
                                      leading-6
                                      text-white/60
                                  "
                              >
                                  The same amount of money can buy less
                                  as prices rise over time.
                              </p>
                          </div>

                      </div>
                  </div>

              </div>
          </div>
      </section>


      {/* CTA */}
      <section
          className="
              border-t
              border-black/10
              bg-black
              text-white
          "
      >
          <div
              className="
                  mx-auto
                  w-full
                  max-w-7xl
                  px-4
                  py-24
                  sm:px-6
                  lg:px-8
              "
          >
              <div
                  className="
                      mx-auto
                      max-w-3xl
                      text-center
                  "
              >

                  {/* Eyebrow */}
                  <p
                      className="
                          text-body-sm
                          font-medium
                          uppercase
                          tracking-[0.2em]
                          text-brand-500
                      "
                  >
                      Ready to explore?
                  </p>


                  {/* Heading */}
                  <h2
                      className="
                          mt-4
                          text-h2
                          font-bold
                          leading-tight
                          tracking-tight
                          text-white
                      "
                  >
                      See what inflation could
                      <span className="block text-brand-500">
                          mean for your money.
                      </span>
                  </h2>


                  {/* Description */}
                  <p
                      className="
                          mx-auto
                          mt-5
                          max-w-xl
                          text-body
                          leading-7
                          text-white/60
                      "
                  >
                      Put your own number into MoneyMonkey and explore
                      how inflation could affect its value over time.
                  </p>


                  {/* CTA */}
                  <div className="mt-8">
                      <a
                          href="/prediction"
                          className="
                              inline-flex
                              items-center
                              justify-center
                              rounded-md
                              bg-brand-500
                              px-6
                              py-3
                              text-body-sm
                              font-semibold
                              text-black
                              transition
                              hover:bg-brand-400
                          "
                      >
                          Make a Prediction
                      </a>
                  </div>


                  {/* Supporting text */}
                  <p
                      className="
                          mt-4
                          text-caption
                          text-white/40
                      "
                  >
                      Explore your potential future value with MoneyMonkey.
                  </p>

              </div>
          </div>
      </section>

    </main>
  );
}

