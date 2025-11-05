import React from "react";
export default function AuthLayout({
    children
}:{
    children: React.ReactNode
}){
    return  <div className="w-full h-auto">
      <div className="w-full h-full bg-red-500 ">
        <div className="w-full  bg-red-500">{children}</div>
      </div>
    </div>
}