"use client";
import { useSearchParams, useRouter } from "next/navigation";
import ReactDOM from 'react-dom';

export default function ModalWrapper({children, className}){
    const searchParams = useSearchParams();
    const isOpen = searchParams.get("modal") === "open";
   
    
      if (!isOpen) return null;

    return ReactDOM.createPortal(<div className={className}>{children}</div>

, document.getElementById("reusablePortal"))
}