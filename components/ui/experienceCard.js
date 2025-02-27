import Image from "next/image"

export default function ExperienceCard({el,i, variant, data}){
    return (
        <li  key={i} className={` py-10 mx-10 ${i!==data.length-1 ? "border-b-[0.5px]" : ""} ${variant==="light" ? "border-accent-secondary" : "border-accent"} `}>
                      <div className="max-w-[360px] flex">
                      <div className="flex justify-center items-center mr-5  ">
                       <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full"> 
         <Image src={el.src} width={25}  height={25} alt={el.title}   />
         </div> 
         </div>
         <div  className={`${variant==="light" ? "text-primary" : "text-accent-second"}`}>
          <h5 className="mb-2 font-bold text-lg">{el.title}</h5>
          <p className={`${variant==="light" ? "" : "text-white-transparent"}`}>{el.text}</p>
         </div>
         </div>
         </li>
    )
}