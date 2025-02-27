import CardSlider from "@/components/ui/card-slider";
import Image from "next/image";
import { items,experienceArr,experienceArrTwo } from "@/data/home";


export default function Experience() {
  return (
    <section className="mx-auto mt-[90px]  xl:max-w-[1280px]">
      <div className="flex">
      <div className="w-[36%]">
        <p className="mb-[14px] font-bold uppercase text-secondary">
          Experience
        </p>
        <h2 className="mb-6 font-youngSerif text-4xl font-normal leading-[50px] text-primary">
          The Story Behind Our Ocha House
        </h2>
        <p className="mb-[10px] text-lg font-medium leading-7 text-primary">
          We also specialize in bubble tea, a beverage originating from Taiwan
          that combines freshly brewed teas with a large variety of exotic
          natural fruit concentrates, served cold with delicious chewy tapioca
          pearls.
        </p>
        <button className="mt-7 bg-accent px-9 py-4 font-bold uppercase tracking-[1px] text-primary">
          learn more
        </button>
      </div>
      <div className="w-[64%]">
        <CardSlider items={items} />
      </div>
      </div>
      <div className="py-20 flex">
        <div className="w-1/2 bg-accent" >
        <ul >
          {experienceArr.map((el,i)=>(
            <li  key={i} className={` py-10 mx-10 ${i!==experienceArr.length-1 ? "border-b-[0.5px]  border-accent-secondary" : ""}  `}>
              <div className="max-w-[350px] flex">
              <div className="flex justify-center items-center mr-5  ">
               <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full"> 
 <Image src={el.src} width={25}  height={25} alt={el.title}   />
 </div> 
 </div>
 <div  className="text-primary">
  <h5 className="mb-2 font-bold text-lg">{el.title}</h5>
  <p>{el.text}</p>
 </div>
 </div>
 </li>
          ))}
      
       </ul>
        </div>
        <div className="w-1/2  bg-primary" >
        <ul >
          {experienceArrTwo.map((el,i)=>(
            <li  key={i} className={` py-10 mx-10 ${i!==experienceArr.length-1 ? "border-b-[0.5px]  border-accent" : ""}  `}>
              <div className="max-w-[350px] flex">
              <div className="flex justify-center items-center mr-5  ">
               <div className="flex justify-center items-center w-16 h-16 bg-white rounded-full"> 
 <Image src={el.src} width={25}  height={25} alt={el.title}   />
 </div> 
 </div>
 <div  className="text-accent-second">
  <h5 className="mb-2 font-bold text-lg">{el.title}</h5>
  <p className="text-white-transparent">{el.text}</p>
 </div>
 </div>
 </li>
          ))}
      
       </ul></div>
      </div>
    </section>
  );
}
