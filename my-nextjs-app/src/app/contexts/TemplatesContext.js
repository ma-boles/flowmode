'use client'
import React, { useState, useContext, createContext, useEffect } from "react";

const TemplateContext = createContext();

export default function TemplateProvider ({ children }) {
    const [templatesList, setTemplatesList] = useState([]);

    const removeTemplate = async (templateId) => {
        if (!templateId) {
          console.log('No templates ID provided');
          return; // Prevent removing empty titles
        }
        try {
          const response = await fetch(`/api/template?templateId=${templateId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          if (!response.ok){
            throw new Error('Failed to remove template');
          }

          // Update the local state
          const { templates } = await response.json();
          setTemplatesList((prevTemplates) =>
            prevTemplates.filter((item) => item.id !== templateId));
    
          console.log(`Updated templates list: ${templates}`);
    
        } catch (error) {
          console.error('Error removing template:', error);
        }
      };

      // Update Templates array
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

      // Update Titles 
      const updateTemplateTitle = async(templateId) => {
        if(!newTitle.trim()) {
            alert('Title cannot be empty!');
            return;
        }

        try {
            console.log(`New Template Title: ${newTitle}`);

            // Call the API to update template
            const response = await fetch('/api/template/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    templateId: templateId,
                    newTitle: newTitle
                })
            });

            if(!response.ok) {
                throw new Error('Failed to save new title');
            }

            const result = await response.json();
            console.log('New title saved successfully!');

            alert('New title saved!');
        } catch(error) {
            console.error('Error saving new title', error);
            alert('Failed to save new title. Please again later.');
        }
    };

      return (
        <TemplateContext.Provider
            value={{
                removeTemplate,
                updateTemplates,
                updateTemplateTitle,
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

