import { UserIcon, Computer, Page, Journal, Globe } from './components/Icons';

const HomePage = () => {
  return (
  <main className="pb-20">
    <p className="text-center text-stone-100 m-14 mb-4 text-xl sm:text-4xl">Welcome to</p>
    <h1 className="text-center text-stone-100 font-bold text-5xl md:text-9xl text-shadow">NXExams</h1>
    {/* flex parent */}
    <section className="flex flex-col w-4/5 my-14 mx-auto max-w-2xl text-gray-700 md:font-bold text-lg md:text-xl text-center md:text-left">
     {/* flex item */}
      <div className="home-card">
        <Globe/>
        <h2 className="w-3/4 pt-6 md:p-0">View exam locations all over the world!</h2>
      </div>

      {/* flex item */}
      <div className="home-card">
        <UserIcon/>
        <h2 className="w-3/4 pt-6 md:p-0">Create an account and view your candidates' exams.</h2>
      </div>

      {/* flex item */}
      <div className="home-card">
        <Page/>
        <h2 className="w-3/4 pt-6 md:p-0">Filter exams by candidate, location or date (month or day).</h2>
      </div>

      {/* flex item */}
      <div className="home-card">
        <Journal/>
        <h2 className="w-3/4 pt-6 md:p-0">Pink-themed pagination.</h2>
      </div>

       {/* flex item */}
     <div className="home-card">
        <Computer/>
        <h2 className="w-3/4 pt-6 md:p-0">Powered by serverless technology and cutting-edge web design.</h2>
      </div>
    </section>
  </main>
  );
};

export default HomePage;