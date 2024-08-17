import Link from 'next/link';

// Navbar.js
import React from 'react';
import { Button } from "@/components/ui/button"

// export default function Home() {
//     return (
//         <div className='h-screen flex items-center justify-center'>
//             <h1 id="main_text" className='text-xl w-3/5 font-light paragraph'>
//                     this is where i get to talk about my journalism
//             </h1>
//         </div>
//     );
// }

export default function Hero() {
    return (

        <div className='h-screen flex items-center justify-center'>
             <h1 id="main_text" className='text-xl w-3/5 font-light paragraph'>
                    Hi! I'm Devin. If you're interested in taking a course with me, let me know! Text me at (408)833-3337.
             </h1>
         </div>
    )
  }