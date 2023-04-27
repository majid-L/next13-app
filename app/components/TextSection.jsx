const TextSection = view => {
  return (<section>
    <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-12 text-shadow-sm">{view === 'list' ? 'Viewing all exams' : 'Viewing all exam locations'}</h1>
    <p className="text-center text-stone-100 --max-w-720 mx-auto mt-4 mb-16 md:text-xl">To see all exams for a specific student, click on an exam and you will be taken to the relevant page. <br/>{view === 'map' && 'When using the map, you can zoom in/out and select different view styles.To view information on a specific exam, hover over its icon and from there you can either go to the exam page, or view more exams for that candidate.'}</p>
  
    <div className="--max-w-720 bg-slate-200 w-auto mb-10 mx-auto rounded px-2 pt-2 pb-3 shadow-lg shadow-stone-400/80 ">
    <ul>
    <h2 className="pt-1 mb-1 ml-3 font-bold text-xl">How to filter search results using the calendar</h2>
    <li className="pt-1 text-left px-3 mb-1">To view all exams taking place on a specific day, simply navigate to the correct day in the calendar view and click on it.</li>
    <li className="pt-1 text-left px-3 mb-1">To view all exams taking place on a specific month, click on the black banner at the top of the calendar to bring up the monthly view. From there, you can select the desired month and year and the results will filter accordingly. <span className="font-bold">The calendar will also highlight all the days on which there are exams.</span></li>
    <li className="pt-1 text-left px-3">To reset all date filters, click on the button below the calendar.</li>
    </ul>
    </div>
    </section>);
}

export default TextSection;