const BackToTopButton = () => {
  return<button onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })} className="bg-brightPink border-1 border-gray-500 shadow-lg shadow-pink-950/80 w-56 px-3 py-1 mt-12 rounded-md block mx-auto">Back to top
  </button>;
}

export default BackToTopButton;