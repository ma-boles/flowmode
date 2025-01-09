import React, { useState } from "react";
//import TemplateForm from "./TemplateForm";
import { useTemplateContext } from "@/app/contexts/TemplatesContext";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";

export default function Templates () {
    const { handleSetFlowPlaylist, handleSetRestPlaylist } = usePlaylistContext();
    const { removeTemplate, templatesList, updateTemplateTitle } = useTemplateContext();
    const [activeTemplateId, setActieTemplateId] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);

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

    const handleRemoveTemplate = () => {
        // remove template
    }

    const handleUpdateTitle = () => {
        // update template title
    }

    const handleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };
   /*  const expandTitle = () => {
        alert('Expanding title')
        // expand section to show details
    };
*/

        return (
        <>
        <div className="h-90 px-2 mx-2 mt-2 pb-4 pt-2 bg-black bg-opacity-40 rounded-2xl card-border">
            <h1 className="p-2 text-2xl font-semibold text-left">Templates</h1>
            <div className="pb-2 p-1 bg-blue-800 rounded-md">
              {templatesList && templatesList.length > 0 ? (
                templatesList.map((item) => (
                  <div className="flex w-full justify-between" key={item._id}>
                      <div className="px-1 my-1 flex-grow w-4/5 text-start">
                          <ul className="flex justify-between font-bold ">
                              <div /* title div */  className="flex justify-between w-full">
                              {isEditing ? (
                                <div className="flex">
                                <input 
                                    type="text"
                                    value={newTitle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="New Title"
                                    autofocus
                                    style={{
                                        border: isEditing ? '1px solid white': 'initial',
                                        outline: isEditing ? 'none': '',
                                        backgroundColor: 'transparent',
                                        textIndent: 5,
                                        borderRadius: 5
                                    }}/>
                                    <div className="mx-1 px-1 border border-white cursor-pointer hover:bg-green-600" onClick={() => updateTemplateTitle(item._id)}>V</div>
                                    </div>
                              ): (
                                <h2 onClick={() => setIsEditing(true)}>{item.title}</h2>
                                  /*<button className="px-1 font-light bg-purple-700" onClick={expandTitle}>v</button>*/
                              )}
                              </div>
                          </ul>
                          <li><span className="font-semibold">Flow:</span> {item.flow}</li>
                          <li><span className="font-semibold">Rest:</span> {item.rest}</li>
                      </div>
                      <div /* buttons div */ className="flex flex-col my-2 ml-2 justify-between">
                          <button className="px-1 my-1 text-black font-extrabold text-xl bg-white bg-opacity-60 hover:bg-white rounded-md" onClick={() => handleTemplate(item)}>+</button>
                          <button className="px-1 text-black font-extrabold text-xl bg-white bg-opacity-60 hover:bg-white rounded-md" onClick={() => removeTemplate(item.title)}>-</button>
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