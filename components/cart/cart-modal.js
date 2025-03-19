import { useRouter,usePathname } from "next/navigation";
import ModalWrapper from "../modal/modal-wrapper";


export default function CartModal(){
    const path = usePathname();
    const router=useRouter();

    const closeModal = () => {
        router.push(path, { scroll: false }); 
      };

    return  <ModalWrapper className="z-50 fixed bottom-0 right-0 flex  h-full w-full">
        
    <div className="bg-black opacity-30 h-full w-full" onClick={closeModal}></div>
    <div className=" bg-white h-full w-[375px] opacity-100 z-50 font-urbanist text-primary">
         
            <div className="">
            <button onClick={closeModal} className="text-3xl text-center ">
              x
            </button>
            </div>
          
        </div>
        
        </ModalWrapper>
}