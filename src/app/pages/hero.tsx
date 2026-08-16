export default function Hero() {
    return (
      <div>
        <h1 id='tagline' className='font-semibold text-2xl font-sans mt-10 mb-4'> hey! i'm devin 🙋🏽‍♂️ </h1>
        <p id='bio' className='paragraph'> 
          I'm an engineer based in Palo Alto. I currently work at <a href='https://parallel.ai/' target="_blank">Parallel Web Systems</a> on web infrastructure for LLMs. Previously, I spent time long/short investing at <a href='https://www.bamfunds.com/' target="_blank">Balyasny</a> and studying physics at <a href='https://www.stanford.edu' target="_blank">Stanford University</a>.
        </p>
        <div id='imgallery' className='my-5'>
          <div className="flex flex-wrap md:-m-2">
            <div className="flex w-1/2 flex-wrap">
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={'/images/point_reyes.jpg'} />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={'/images/professional_portrait.jpg'} />
              </div>
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={'/images/spot_trip.jpg'} />
              </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={'/images/summer_duco.jpg'} />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={'/images/xr_hackathon.jpg'} />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={'/images/travel_portrait.jpg'} />
              </div>
            </div>
          </div>
        </div>
        <p id='extended bio' className='paragraph'> I'm deeply curious about "people systems"; the frameworks that govern how we interact and exchange with one another like the internet/<a href="https://elestoque.org/staff_name/devin-gupta/" target="_blank">journalism</a>, financial markets, our <a href="https://rain.stanford.edu/" target="_blank">political infrastructure</a> or art. 
          Often, I've had the most fun exploring these systems with machine learning and interactive visualizations.
          <br /> <br />
          In my free time, I'm a big fan of puzzling, <a href="https://escaperoom.stanford.edu/" target="_blank">escaping rooms</a>, board games, following <a href="https://www.pi.website/blog" target="_blank">generalizable robotics</a>, hiking Castle Rock, listening to <a href="https://open.spotify.com/show/1te7oSFyRVekxMBJUSethH?si=92bc321c89c54098" target="_blank">Joe and Tracy</a> or visiting friends in SF.
          <br /> <br />
          My favorite way to spend time is to meet new people, please don't hesitate to reach out. Send me an email <a href="mailto:devgupta@stanford.edu" target="_blank">here</a>! </p>
      </div>
    )
  }