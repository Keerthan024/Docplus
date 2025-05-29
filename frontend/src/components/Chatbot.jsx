import { useEffect } from "react";

const Chatbot = () => {
    useEffect(() => {
        try {
            window.__ow = window.__ow || {};
            window.__ow.organizationId = "0c8f81bd-3bc9-4ffe-8071-5e373578dfcf";
            window.__ow.template_id = "26fe3d22-c5de-4ab7-8103-1175e12136f3";
            window.__ow.integration_name = "manual_settings";
            window.__ow.product_name = "chatbot";

            const script = document.createElement("script");
            script.src = "https://cdn.openwidget.com/openwidget.js";
            script.async = true;
            script.onload = () => console.log("Chatbot loaded");
            script.onerror = (e) => console.error("Chatbot failed to load", e);
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        } catch (error) {
            console.error("Chatbot error:", error);
        }
    }, []);

    return null; 
};


export default Chatbot;
