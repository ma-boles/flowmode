import React, { useState } from "react";
import TemplateForm from "./TemplateForm";

export default function Templates () {
    const [templatesList, setTemplatesList] = useState([]);

    const sendToFlow = () => {
        alert('Sending template to flow player')
        // send saved titles (template, flow, rest) to flow player
    };

    const expandTitle = () => {
        alert('Expanding title')
        // expand section to show details
    };

    const removeTemplate = async (title) => {
        if (!title) {
          console.log('No title provided');
          return; // Prevent removing empty titles
        }
        try {
          const response = await fetch('/api/remove-template', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ templatesTitle: title }),
          });
    
          if (!response.ok){
            throw new Error('Network response was not ok');
          }
          // Update the local state
          const { templates } = await response.json();
          setTemplatesList((prevTemplates) =>
            prevTemplates.filter((item) => item.title !== title));

          console.log(`Updated templates list: ${templates}`);

        } catch (error) {
          console.error('Error removing template:', error);
        }
      };

        return (
        <>
        <div className="p-4 bg-white bg-opacity-20 border border-white">
            <h1 className="mb-2 text-center font-bold text-xl opacity-90">Templates:</h1>
            <div className="my-2">
                <div className="flex w-full justify-between" >
                    <div className="px-1 flex-grow bg-blue-700 w-4/5 border border-white text-start">
                        <ul className="flex justify-between font-bold ">
                            <div /* buttons div */ className="flex justify-between w-full">
                                <h2>Title </h2>
                                <button className="px-1 font-light bg-purple-700" onClick={expandTitle}>v</button>
                            </div>
                        </ul>
                        <li><span className="font-semibold">Flow:</span> Flow Title</li>
                        <li><span className="font-semibold">Rest:</span> Rest Title</li>
                    </div>
                    <div className="flex flex-col my-2 ml-2 justify-between">
                        <button className="px-1 bg-black hover:bg-white rounded-md" onClick={sendToFlow}>+</button>
                        <button className="px-2 bg-black hover:bg-white rounded-md" onClick={removeTemplate}>-</button>
                    </div>
                </div>
            </div>

           <TemplateForm />

        </div>
        </>
    )
}