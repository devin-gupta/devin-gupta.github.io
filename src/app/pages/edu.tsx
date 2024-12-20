export default function Edu() {
    return (
      <div>
        <h1 id='tagline' className='font-semibold text-2xl font-sans my-10'> my education ✍🏽 </h1>
        <p id='bio' className='paragraph'> I'm currently a junior at <a href="https://www.stanford.edu/" target="_blank">Stanford</a> pursuing degrees in <b>Physics</b> and <b>Management Science & Engineering</b> with a minor in <b>Math</b>. These broadly map to my academic interests in decentralized networking and algorithimic thinking, within the fields of robotics, market design and climate-tech.
        <br />
        </p>
        <p className='paragraph'>
            <br /> 
            As a part of my studies, I was part of Stanford's <a href="https://explore-energy.stanford.edu/explore-energy-house" target="_blank">Energy Theme House</a>, where I explored the lifecycle of climate-tech businesses, with visits to Tesla's Nevada gigafactory and Redwood Material's HQ. In my freshman year, I completed Stanford's <a href="https://sis.stanford.edu/structured-liberal-education-sle">Structured Liberal Education (SLE)</a> program, living and learning with an extraordinary group of friends. Here's a photo of SLE's annual yosemite trip!
            <br /> <br />
        </p>
        <div className="flex items-center justify-center">
            <img src={"/images/sle_yosemite.jpg"} alt="sle dorm takes on yosemite" className="block h-full w-3/4 rounded-lg object-cover object-center"/>
        </div>
        <p className='paragraph'>
            <br />
            Earlier, I graduated from <a href="https://mvhs.fuhsd.org/" target="_blank">Monta Vista High School</a> in 2022, where I primarily led business and tech for <a href="https://elestoque.org/staff_name/devin-gupta/">El Estoque</a>. I also acted as class president at a time and co-presided the school's mock trial team.
            <br /><br />
            I've also been lucky to be able to attend some amazing conferences like Horizon Quantum's Triple Alpha launch, Citadel's 2024 Trading Invitational, TechCrunch Disrupt 2023, GCP's Fall Workshop and Cal Hacks. For any journalists, I'm an alum of <a href="https://www.medill.northwestern.edu/journalism/high-school-programs/medill-cherubs.html" target="_blank">Medill's Cherubs program</a> and have attended many JEA, NSPA and SNO workshops.
            <br /><br />
            I'm currently learning Spanish and Mandarin at Stanford, and speak (some) Hindi and English. And I like to play the acoustic guitar sometimes - currently learning '<a href="https://tabs.ultimate-guitar.com/tab/john-mayer/slow-dancing-in-a-burning-room-tabs-449994" target="_blank">Slow Dancing in a Burning Room</a>' by John Mayer.
            <br /><br />
            My resume is linked <a href="https://docs.google.com/document/d/1-0lO2Nq_y5oTgNPq-1ncS7WvLHkF6KrgIg3cMTMywuY/edit?usp=sharing" target="_blank">here</a>.
            <br /> <br />
        </p>
        <hr className="my-3 border-0 h-px"/>
        <h1 id='tagline' className='font-semibold text-2xl font-sans my-10'> my coursework 📚 </h1>
        <p className="paragraph">
            In the fall, I plan to take <i>CS 229: Machine Learning</i>, <i>Dance 46: Social Dance 1</i> and do some research. For my remaining coursework, I did my best to pull out my favorite course highlights. 
            <br /> <br />
        </p>
        <ul className="list-disc paragraph">
            <b>Physics</b>
            <li className="ml-5">61: Mechanics and Special Relativity - Lorentz transformations, space-time invariance and causality, by Prof. Pat Burchat!</li>
            <li className="ml-5">71: Quantum and Thermal Physics - uncertainty principle, wave equations, fourier transforms and some stat mech. </li>
            <li className="ml-5">81: E&M using Special Relativity and Vector Calculus - symmetry proofs, Maxwell's equations, electromagnetic waves. </li>
            <li className="ml-5">112: Mathematical Models for Physics - group theory and complex analysis by Professor Kivelson. </li>
            <li className="ml-5">113: Computational Physics - monte carlo and numerical methods for PDEs including stability analysis, with final paper on <a href="https://github.com/devin-gupta/class_notes/blob/main/physics113/Quantum_Algos_Final/README.md" target="_blank">implementing Shor's and Grover's algorithms</a>. </li>
            <br />
            <b>Math</b>
            <li className="ml-5">51: Linear Algebra & Multivariable Calculus - matrix algebra, gradient optimization, some Markov chains. </li>
            <li className="ml-5">52: Integral Calculus of Several Variables - Gauss and Stokes's thereoms.  </li>
            <li className="ml-5">53: Differential Equations with Linear Algebra and Fourier Methods - stability analysis, BVPs and fourier transforms by Prof. Asserian : )  </li>
            <li className="ml-5">131P: Partial Differential Equations  - Sturm-Liouville Problems... wrote a <a href="https://drive.google.com/file/d/1F9y5sjOcsVxhPIltkMLeGRoPRCeXf2JI/view?usp=sharing" target="_blank">final paper on Schrödinger's Equation</a>.  </li>
            <br />
            <b>MS&E</b>
            <li className="ml-5 paragraph">148: Ethics of Finance - guest speakers included Rob Chestnut (Airbnb General Counsel) and Michele Korver (Crypto Regulatory at a16z) with a <a href="https://docs.google.com/presentation/d/1vNOSGU_Hurs3QGqitZhFfEmPLZ_PxAYsORS5ZKmVr6g/edit?usp=sharing" target="_blank">final report</a>.</li>
            <li className="ml-5">135: Networks - graph theory, information diffusion, aggregate behavior in markets and crowds, I added to <a href="https://web.stanford.edu/group/msande135/cgi-bin/wp/" target="_blank">course blog</a>. </li>
            <li className="ml-5">232: Intro to Game Theory - more rigorous treatment of infinite and finite games, some mechanism design by Prof. Ramesh Johari. </li>
            <br />
            <b>Computer Science</b>
            <li className="ml-5 paragraph">161: Design and Analysis of Algorithms - asymptotic analysis, efficient search and storage, graph traversal, dynamic programming and randomization. </li>
            <li className="ml-5">221: Artificial Intelligence - constraint satisfaction, markov decision processes, logic with final project on <a href="https://docs.google.com/document/d/1NCAb6EXuRm02_nIx5v8mpftQBazq4Pc8EvEzMyRddys/edit?usp=sharing" target="_blank">Estimating Task Uncertainty in Robotics</a>. </li>
            <br />
            <b>SLE</b>
            <li className="ml-5">91: SLE Fall - Gilgamesh, Homer's Odyssey, Plato and Aristotle, Qu'ran, Yuri Herrera's Signs taught by Michaela Hulstyn. </li>
            <li className="ml-5">92: SLE Winter - Sir Gawain, Dante's Inferno, Descartes's Meditations, Frankenstein taught by Michaela Hulstyn, wrote a  <a href="https://docs.google.com/document/d/1RHujxWkijo6mPOjdulMjydN5-P3MUZ_X1zWaCwN9-V0/edit?usp=sharing" target="_blank">paper on Bruegel's Fall of Icarus</a>. </li>
            <li className="ml-5">93: SLE Spring - Marx, Baldwin's Stranger in the Village, Freud, Surrealism, Sartre's Existentialism and Fanon's Wretched of the Earth taught by Jeremy Sabol. Wrote 20 pages on <a href="https://docs.google.com/document/d/1O2s6astXeBo5KzEBDFkLncPV6G1aB5so_JMefSQt0TI/edit?usp=sharing" target="_blank">Marx, Labor Networks and Opportunity Insights</a>. </li>
            <br />
            <b>Other</b>
            <li className="ml-5">English 66: A Model Island - historical perspectives of the UK with <a href="https://docs.google.com/document/u/1/d/1hGR1cjvm0V3HP0jLQ-wqZ-vsul_thsdQZNFj5dWMlR0/edit?pli=1" target="_blank">a couple papers</a>. </li>
            <li className="ml-5">Design 245: Redesigning Finance - user-centered and iterative design focused on <a href="https://docs.google.com/presentation/d/1xsAd946Tqz8vV-Io-JghnQ2mVrLAZYfkIZ9hvh1RI9c/edit?usp=sharing" target="_blank">new-grad wealth management</a> under Prof. Brandon Middleton and Prof. Bruce Cahan. </li>
        </ul>
        <br />
        <p id='bio' className='paragraph'>If you have course suggestions or questions, please do <a href="mailto:devgupta@stanford.edu" target="_blank">reach out</a>.</p>
      </div>
    )
  }