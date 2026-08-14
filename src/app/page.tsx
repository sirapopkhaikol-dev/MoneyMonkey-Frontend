// import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-6 py-20">
        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
            AI Inflation Forecasting
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Understand the future of your money.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            MoneyMonkey uses historical economic data and machine learning
            to forecast future inflation and estimate its impact on your money.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/login"
              className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Get Started
            </a>

            <a
              href="#how-it-works"
              className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100"
            >
              How It Works
            </a>
          </div>

        </div>
      </section>


      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-t border-gray-200 bg-gray-50"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              How It Works
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              From economic data to prediction.
            </h2>
          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* Step 1 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <span className="text-sm font-semibold text-gray-500">
                01
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                Historical Data
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                MoneyMonkey uses historical economic data as the foundation
                for its forecasting model.
              </p>
            </div>


            {/* Step 2 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <span className="text-sm font-semibold text-gray-500">
                02
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                AI Model
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                A machine learning model analyzes historical patterns to
                estimate future inflation.
              </p>
            </div>


            {/* Step 3 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <span className="text-sm font-semibold text-gray-500">
                03
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                Forecast
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                View the predicted inflation rate and understand how it may
                affect your money over time.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">

        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            About MoneyMonkey
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            A simple way to explore inflation forecasts.
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            MoneyMonkey is a full-stack application that combines a web
            frontend, backend API, database, and machine learning service
            into one forecasting platform.
          </p>
        </div>

      </section>


      {/* CTA */}
      <section className="border-t border-gray-200 bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">

          <h2 className="text-3xl font-bold">
            Ready to make a prediction?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Create a prediction and explore how inflation could change
            the value of your money over time.
          </p>

          <a
            href="/login"
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            Start Forecasting
          </a>

        </div>
      </section>

    </main>
  );
}

