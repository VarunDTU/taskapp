function App() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Varun Negi
            <strong className="font-extrabold text-red-700 sm:block">
              Brand Kiln Assignment
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Front End Development internship Assignment
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/tasks"
            >
              Tasks
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="https://github.com/VarunDTU/taskapp"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
