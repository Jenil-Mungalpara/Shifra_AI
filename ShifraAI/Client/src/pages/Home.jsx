import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AssistantPreview } from '../Components/AssistantPreview';
import logo from "../assets/logo.svg"

const STEPS = [
  {
    step: "01",
    title: "Sign up free",
    desc: "Continue with Google and create your assistant instantly.",
  },
  {
    step: "02",
    title: "Customize assistant",
    desc: "Set your business name, tone, voice and theme.",
  },
  {
    step: "03",
    title: "Train your assistant",
    desc: "Add business details and personalize responses.",
  },
  {
    step: "04",
    title: "Embed anywhere",
    desc: "Copy one script tag and add it to your website.",
  },
];

function Home({user}) {

  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-[#f8f1fc] overflow-hidden'>

        <section className='relative overflow-hidden px-4 sm:px-6 lg:px-8pt-16 sm:pt-20 lg:pt-24 pb-20'>
           
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-emerald-50" />

        <div className="absolute top-0 left-1/4 w-[320px] h-[320px] bg-purple-200/40 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-emerald-200/40 blur-3xl rounded-full" />
            

        <div className='relative max-w-6xl mx-auto'>

          <div className='flex justify-center'>
              <span className='inline-flex items-center gap-2 bg-white border border-purple-100 shadow-sm text-purple-500 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full'>
                 <span className='w-2 h-2 bg-emerald-400 rounded-full'/>
                  Voice AI For Modern Website
              </span>
          </div>

          <div className='text-center mt-10 sm:mt-12'>
            <h1 className='max-w-5xl mx-auto text-[42px] leading-[52px] sm:text-6xl sm:leading-[72px] lg:text-7xl lg:leading-[88px] font-black tracking-[-0.04em] text-[#081028]'>
            Add a{" "}
            <span className="inline-block px-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500">
                Virtual Assistant
              </span>
            </span>
            <br className="hidden sm:block" />
            to your website
          </h1>

            <p className='max-w-2xl mx-auto mt-7 text-sm sm:text-lg lg:text-xl text-[#64748b] leading-relaxed px-2'>
            Create a smart voice-enabled assistant that talks to visitors,
            answers questions and helps users navigate your website instantly.
            </p>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
            
            <button onClick={() => navigate("/builder")} className='w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-semibold text-sm sm:text-base shadow-[0_12px_40px_rgba(168,85,247,0.25)] hover:scale-[1.02] transition-all cursor-pointer'>
              Build Your Assistant
            </button>

          </div>
          <p className='mt-5 text-xs sm:test-sm text-gray-400'>
            Free plan includes 200 AI responses
          </p>

          </div>

          <AssistantPreview/>

        </div>
        </section>

        <section className='px-4 sm:px-6 lg:px-8 py-20 bg-white'>

          <div className='max-w-6xl mx-auto'>
             <div className='text-center mb-14'>
              <h2 className='text-3xl sm:text-4xl fond-bold text-black'>Get started in minutes</h2>
              <p className='text-gray-500 mt-3 text-sm sm:text-base'>
                Simple setup . No complete integration.
              </p>
             </div>

             <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
               {STEPS.map((s,i)=>(
                  <div key={i} className='group bg-slate-50 hover:bg-slate-200 border border-gray-100 rounded-[28px] p-7 transition-all hover:shadow-[0_15px_50px_rgba(0,0,0,0.86)] '>

                      <span className='text-4xl font-black text-transparent
                      bg-clip-text bg-gradient-to-r from-purple-500
                       to-emerald-500'>{s.step}</span>

                      <h3 className='mt-5 text-lg font-semibold text-[#081028]'>
                      {s.title}</h3>

                      <p className='mt-3 text-sm text-gray-500 leading-relaxed'>
                      {s.desc}</p>

                  </div>
               ))}
             </div>
          </div>
        </section>

        <footer className='bg-[#081028] px-6 py-10' >

          <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left'>

           <div>
              <div onClick={() => navigate("/")} className='flex items-center gap-2.5 cursor-pointer'>
                       <img src={logo} alt="logo" className='h-9 w-auto object-contain' />
                       
                       <h1 className='font-bold text-xl text-gray-200 leading-none'>
                         Shifra <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500'>AI</span>
                       </h1>
                    </div>

                    <p className='text-gray-400 text-sm mt-1'>
                       Voice AI assistant for websites
                    </p>
           </div>

           <p className='text-gray-500 text-sm'>
            © {new Date().getFullYear()} ShifraAI. All rights reserved.
          </p>
          </div>
        </footer>

    </div>
  )
}

export default Home