import React, { useState } from "react";
//import TemplateForm from "./TemplateForm";
import { useTemplateContext } from "@/app/contexts/TemplatesContext";

export default function Templates () {
  const { removeTemplate, sendToFlow, templatesList } = useTemplateContext();

    const expandTitle = () => {
        alert('Expanding title')
        // expand section to show details
    };


        return (
        <>
        <div className="p-4 my-1  bg-white bg-opacity-20 border border-white">
            <h1 className="mb-2 text-center font-bold text-xl opacity-90">Templates:</h1>
            <div className="my-2">
              {templatesList && templatesList.length > 0 ? (
                templatesList.map((item) => (
                  <div className="flex w-full justify-between" key={item.title} >
                      <div className="px-1 my-1 flex-grow bg-blue-700 w-4/5 border border-white text-start">
                          <ul className="flex justify-between font-bold ">
                              <div /* title div */  className="flex justify-between w-full">
                                  <h2>{item.title}</h2>
                                  {/*<button className="px-1 font-light bg-purple-700" onClick={expandTitle}>v</button>*/}
                              </div>
                          </ul>
                          <li><span className="font-semibold">Flow:</span> {item.flow}</li>
                          <li><span className="font-semibold">Rest:</span> {item.rest}</li>
                      </div>
                      <div /* buttons div */ className="flex flex-col my-3 ml-2 justify-between">
                          <button className="px-1 bg-black hover:bg-white rounded-md" onClick={sendToFlow}>+</button>
                          <button className="px-2 bg-black hover:bg-white rounded-md" onClick={() => removeTemplate(item.title)}>-</button>
                      </div>
                  </div>
                  ))
                  ) : (
                      <p>No Titles Added</p>
                  )}
            </div>

          {/* <TemplateForm /> */}

        </div>
        </>
    )
}