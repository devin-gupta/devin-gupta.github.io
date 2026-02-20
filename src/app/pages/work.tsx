export default function Work() {
    return (
      <div>
        <h1 id='tagline' className='font-semibold text-2xl font-sans mt-10 mb-4'> my work 💼 </h1>
        <p id='bio' className='paragraph'> 
            {/* Much of my experience has been in 'computational social science', applying engineering skills to ensure our political and social systems work effectively.  */}
            For the most updated verson of my work history, please check out my <a href="https://www.linkedin.com/in/devin-gupta/" target="_blank">Linkedin</a> or my <a href="https://docs.google.com/document/d/1-0lO2Nq_y5oTgNPq-1ncS7WvLHkF6KrgIg3cMTMywuY/edit?usp=sharing" target="_blank">resume</a>.  
        </p>
        {/* DISTYL AI */}
        <p id='bio' className='paragraph'>
            <br />
            <b>Intern, AI Research</b> @ <a href="https://distyl.ai/" target="_blank">Distyl AI</a><br />
            (Summer 2025): Researched and built LLM-based 'systems' and browser agents for Series-B AI consultancy as research hire #7 at <a href='https://www.bizjournals.com/sanfrancisco/news/2025/09/26/dystal-ai-unicorn-headquarters-55-hawthorne.html?ana=giftarticle&utm_campaign=giftarticle&csrc=6452&gift_article_id=47849' target="_blank">~100m in F50 revenue</a>.
        </p>
        <ul className="list-disc paragraph"> <br />
            <li className="ml-5"><i>Automated Value Discovery 'Button':</i> co-developed LLM-driven research system that autonomously generated $100 M-scale strategic ideas for Fortune 50 clients. Integrated Exa and SerpAPI search with iterative reasoning and prompt-augmentation loops; used in three enterprise demos and later advanced a client contract. </li>
            <li className="ml-5"><i>Browser Agents:</i> led development of hierarchical-planning technique for Distyl’s internal browser model, improving task-completion on the WebArena benchmark by ~20% (shopping-admin environment), via GPT-5 reasoning and browserbase cloud execution.</li>
            <br />
        </ul>
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
                <img className="h-auto max-w-full rounded-lg" src="/images/distyl_research.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/distyl_devin.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/distyl_charcuterie.jpg" alt="" />
            </div>
            <div className="col-span-2">
                <img className="h-auto max-w-full rounded-lg" src="/images/distyl_tmobile.jpg" alt="" />
            </div>
        </div>
        {/* BALYASNY ASSET MANAGEMENT */}
        <p id='bio' className='paragraph'>
            <br />
            <b>Summer Associate, Propietary Research</b> @ <a href="https://www.bamfunds.com/" target="_blank">Balyasny Asset Management</a><br />
            (Summer 2024): Interned under PM Stephen Schurr in Long/Short equities at a multi-strategy hedge fund with ~$24b AUM.
        </p>
        <ul className="list-disc paragraph"> <br />
            <li className="ml-5"><i>Data Pipeline for Centralized Research:</i> integrated alternative data sources into propietary data platform, enabling better "thematic" equity understanding for fundamental investing.</li>
            <li className="ml-5"><i>Fundamental Investing:</i> pitched and led investments in 3 short positions, within semiconductor supply chain investments. Did diligence including sell-side & expert interviews, and financial model analysis. </li>
            <li className="ml-5"><i>Applied AI for Investing:</i> built on top of BAM's embedding models for semantic mapping and visualization. Implemented scalabale data extraction techniques like Apache Spark or using AWS Redshfit.</li>
            <br />
        </ul>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/nyc_bam.jpg" alt="" />
            </div>
            <div className='col-span-2'>
                <img className="h-auto max-w-full rounded-lg" src="/images/nyc_golf.jpg" alt="" />
            </div>
            <div className='col-span-2'>
                <img className="h-auto max-w-full rounded-lg" src="/images/nyc_dinner.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/nyc_city.jpg" alt="" />
            </div>
        </div>
        {/* ATOMIC VAULTS */}
        <p  id='bio' className='paragraph'>
            <br />
            <b>Quantitative Research Intern</b> @ <a href="https://www.atomicvaults.com/" target="_blank">Atomic Vaults</a><br />
            (Fall 2023): Joined a finance technology startup bringing fractional options to market, via propietary risk management and trading algorithms. I worked on:
        </p>
        <ul className="list-disc paragraph"> <br />
            <li className="ml-5"><i>Analyzed Options Chain:</i> leveraged on-exchange options data to discover latent retail demand for fractional options, analyzing delta distributions around stock splits. Involved UAT testing of new data pipelines, pulling cloud data and robust data visualization.</li>
            <li className="ml-5"><i>Sourced Angel Investors:</i> helped lead sourcing and strategy for seed round, developing strong networks in fintech VC and retail investing, specifically focused on angels around fractional options for directly-indexed SMAs and the RIA market. </li>
            <li className="ml-5"><i>Led Wealth Management Division:</i> built partnerships across tech stack, from generating client interest, creating buy-in from 4 large options-focused RIAs, 3 relevant introducing brokers, 5 asset managers and 3 major custodians.  </li>
        </ul>
        <br />
        <div className="grid grid-cols-2 gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/av_mindspace.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/av_selfie.jpg" alt="" />
            </div>
        </div>
        {/* DUCO */}
        <p  id='bio' className='paragraph'>
            <br /> 
            <b>Engineering and Tech Policy Intern</b> @ <a href="https://www.ducoexperts.com/" target="_blank">Duco Experts</a><br />
            (Summer 2023): Worked at a technology policy consulting startup that helps large tech clients (like Meta's Oversight Board and the Atlantic Council) in Generative AI, the Metaverse, platform security and Trust & Safety. In my 12 weeks there, I took on the following projects: 
        </p>
        <ul className="list-disc paragraph"> <br />
            <li className="ml-5"><i>Systematized Pricing Strategy:</i> ran a 6 week survey, built client and deliverable based data visualizations and determined primary time sinks (33% expert recruitment and 28% business development). Used data to project HQ expenditure and estimated pricing baseline. </li>
            <li className="ml-5"><i>Automated Policy Research:</i> integrated Zapier, GSheets and OpenAI to scrape and evaluate 300+ global policy headlines / week. Involved building infrastructure to backtest prompts against human labeled dataset. </li>
            <li className="ml-5"><i>Supported 4 client accounts:</i> compiled ~20 client deliverables for top tech and finance executives including market sizing, briefings on GenAI and Metaverse policy, Android Malware. </li>
        </ul>
            <br />
        <div className="grid grid-cols-2 gap-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/duco1.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/duco2.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/duco3.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="/images/duco4.jpg" alt="" />
            </div>
        </div>
        {/* <p id='bio' className='paragraph'> 
            <br /> <br /> 
            <b>Undergraduate Research Assistant</b> @ <a href="https://www.ducoexperts.com/" target="_blank">Duco Experts</a><br />
            (Summer 2023): Worked at a technology policy consulting startup that helps large tech clients (like Meta and the Atlantic Council) in Generative AI, the Metaverse, platform security and Trust & Safety. In my 12 weeks there, I took on the following projects: 
        </p> */}
      </div>
    )
  }