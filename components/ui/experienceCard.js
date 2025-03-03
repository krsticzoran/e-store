import Image from "next/image"

export default function ExperienceCard({el,index, variant, length}){
    return (
        <li  key={index} className={` py-10 mx-10 ${index!==length-1 ? "border-b-[0.5px]" : ""} ${variant==="light" ? "border-accent-secondary" : "border-accent flex justify-end"}`}>
                      <div className={`max-w-[360px] flex ${variant==="light" ? "" : "flex-row-reverse "} `}>
                      <div className={`flex  items-center ${variant==="light" ? "mr-5" : "ml-5 "}  `}>
                       <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full"> 
         <Image src={el.src} width={25}  height={25} alt={el.title}   />
         </div> 
         </div>
         <div  className={`${variant==="light" ? "text-primary" : "text-accent-second text-right"}`}>
          <h5 className="mb-2 font-bold text-lg">{el.title}</h5>
          <p className={`${variant==="light" ? "" : "text-white-transparent"}`}>{el.text}</p>
         </div>
         </div>
         </li>
    )
}