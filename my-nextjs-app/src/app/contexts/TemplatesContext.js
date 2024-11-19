'use client'
import React, { useState, useContext, createContext, useEffect } from "react";

const TemplateContext = createContext();

export default function TemplateProvider ({ children }) {
    const [templatesList, setTemplatesList] = useState([]);

    const sendToFlow = () => {
        alert('Sending template to flow player')
        // send saved titles (template, flow, rest) to flow player
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
            body: JSON.stringify({ templateTitle: title }),
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

      const updateTemplates = async () => {
        //console.log('Fetching favorites...')
        try {
          const response = await fetch('/api/display-data');
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          console.log('Fetched data:', data)
          
          setTemplatesList(data.templates); // Assuming the response data is an array of templates 
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };

      // Assuming templatesList is your state variable for the templates
      useEffect(() => {
        console.log("Updated templates list:", templatesList);
      }, [templatesList]); // This will run every time templatesList changes

      return (
        <TemplateContext.Provider
            value={{
                removeTemplate,
                sendToFlow,
                updateTemplates,
                templatesList
            }} 
        >
            {children}
        </TemplateContext.Provider>
      )
}

export const useTemplateContext = () => {
    const context = useContext(TemplateContext);
    if(!context) {
        throw new Error('useTemplateContext must be used within a TemplateProvider');
    }
    return context;
};

