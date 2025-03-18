import { useRouter } from "next/navigation";
import ModalWrapper from "../modal/modal-wrapper";


export default function CartModal(){
    const router=useRouter();

    const closeModal = () => {
        router.push("/", { scroll: false }); 
      };

    return  <ModalWrapper className="z-50 fixed bottom-5 right-5 bg-secondary h-full w-full">
        
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Close
            </button>
          </div>
        </div>
        
        </ModalWrapper>
}