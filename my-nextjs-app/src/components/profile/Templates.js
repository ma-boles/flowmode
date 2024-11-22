import React, { useState } from "react";
//import TemplateForm from "./TemplateForm";
import { useTemplateContext } from "@/app/contexts/TemplatesContext";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";

export default function Templates () {
    const { handleSetFlowPlaylist, handleSetRestPlaylist } = usePlaylistContext();
    const { removeTemplate, templatesList } = useTemplateContext();
    const [activeTemplateId, setActieTemplateId] = useState('');

    const onTemplateFlow = (id, name) => {
        handleSetFlowPlaylist(id, name);
        console.log('Template flow:', id, name);
    };

    const onTemplateRest = (id, name) => {
        handleSetRestPlaylist(id, name);
        console.log('Template rest:', id, name);
    };

    const handleTemplate = (item) => {
        handleSetFlowPlaylist(item.flowId, item.flow);
        handleSetRestPlaylist(item.restId, item.rest);

        console.log('Template selected:', {
            flow: item.flow,
            flowId: item.flowId,
            rest: item.rest,
            restId: item.restId,
        });
    };

  /*  const expandTitle = () => {
        alert('Expanding title')
        // expand section to show details
    };
*/

        return (
        <>
        <div className="w-80 h-85 p-2 my-1">
            <div className="pb-2 p-1 bg-green-600 bg-opacity-60 border border-white  rounded-md">
              {templatesList && templatesList.length > 0 ? (
                templatesList.map((item) => (
                  <div className="flex w-full justify-between" key={item.title} >
                      <div className="px-1 my-1 flex-grow w-4/5 text-start">
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
                          <button className="px-1 bg-black hover:bg-white rounded-md" onClick={() => handleTemplate(item)}>+</button>
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