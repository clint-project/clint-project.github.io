"use strict"
const lang = 'ca';
const personalWelcomeMessage = null

const config = {
    botpressUrl: 'https://chat.botpress.cloud',
    botpressApiUrl: 'https://api.botpress.cloud/v1',
    xWorkspaceId: 'abf612d0-af8e-43e0-b1bb-f8db092e35b1',
    bearerToken: 'bp_pat_jo3vp6BMeKyuHQHyJEIJFc1zZxGJSmKwtpde',
    xBotId: 'e63021be-3f67-4111-af01-39c4ccac32ab',
    botpressWebhookId: '161c58db-f953-4d59-ab6b-7f97b2b7c693',
    table:"feedBackTable",
};

const translations = {
    en: {
        personalWelcomeMessage,
        welcomeMessage: 'Hello! What can I help you?',
        botNoAnswer: 'No response received from the bot.',
        errorInteracting: 'Error interacting with Botpress:',
        errorComunication: 'An error occurred in the communication with the bot.',
        helpfull : "I have found it useful",
        dontHelpfull : "I have not found it useful",
        sorryDontHelpfull : 'We are sorry you did not find it helpful',
        thxFeedback : 'Thank you for your feedback!',
        ErrSendFeedback : "Error sending feedback",
        erroRequest: "Error in request:",
        helpUsImprove : "Help us to improve the system",
        writeFeedback : 'Write a feedback...',
        feedbackSendOK : 'Feedback sent correctly',
        empty : '',
        send : 'Send',
        cancel : 'Cancel',
        nopermes: 'The text contains words that are not allowed.',
        textareaerr :'The value of the textarea must be a text string.',
        toplaceholder : 'Write your question',
    },
    ca: {
        personalWelcomeMessage,
        welcomeMessage: '¡Hola! En què puc ajudar-te',
        botNoAnswer: 'No es va rebre resposta del bot.',
        errorInteracting: 'Error interactuant amb Botpress:',
        errorComunication: 'Ha succeït un error en la comunicació amb el bot.',
        helpfull : "Ho he trobat útil",
        dontHelpfull : "No m'ha servit",
        sorryDontHelpfull : 'Lamentem que no li hagi servit',
        thxFeedback : '¡Gracias per el teu feedback!',
        ErrSendFeedback : "Error en enviar el feedback",
        erroRequest: "Error en la sol·licitud:",
        helpUsImprove : "Ajuda'ns a millorar",
        writeFeedback : 'Escriu el teu feedback...',
        feedbackSendOK : 'Feedback enviat correctament',
        empty : '',
        send : 'Enviar',
        cancel : 'Cancel·lar',
        nopermes: "El text conté paraules no permeses.",
        textareaerr :'El valor del textarea ha de ser una cadena de text.',
        toplaceholder : 'Escriu la teva pregunta'
    },
    es: {
        personalWelcomeMessage,
        welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?',
        botNoAnswer: 'No se recibió respuesta del bot.',
        errorInteracting: 'Error interactuando con Botpress:',
        errorComunication: 'Ha sucedido un error en la comunicación con el bot.',
        helpfull : 'Lo he enconttrado útil',
        dontHelpfull : 'No me ha sido útil',
        sorryDontHelpfull : 'Lamentamos que no te haya servido',
        thxFeedback : '¡Gracias por su feedback!',
        ErrSendFeedback : "Error al enviar feedback",
        erroRequest: "Error en la solicitud:",
        helpUsImprove : "Ayúdanos a mejorar",
        writeFeedback : 'Escribe tu feedback...',
        feedbackSendOK : 'Feedback enviado correctamente',
        empty : '',
        send : 'Enviar',
        cancel : 'Cancelar',
        nopermes: 'El texto contiene palabras no permitidas.',
        textareaerr :'El valor del textarea debe ser una cadena de texto.',
        toplaceholder : 'Escribe tu pregunta'

    }
};

const personalizeImg = {
    img : {
        eurecatlogo : "https://lab.eurecatacademy.org/wp-content/uploads/2025/01/LogoOK_con-eslogan.png",
        eurecat: "https://lab.eurecatacademy.org/wp-content/uploads/2025/10/icon_chatbot-3.gif"
    }
}

const Color = {
    institucional : '#505393',
    lightPurple : '#21B2A6',
    white : '#FFF',
    lightGrey : '#f1f1f1',
}

const addContentDialog = (dialog) => {
    const dialogContent = document.createElement('div');
    dialogContent.id = 'dialogContent';
    Object.assign(dialogContent.style, {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    });

    dialog.appendChild(dialogContent);

    const messages = document.createElement('div');
    messages.className = 'messages'
    Object.assign(messages.style, {
        height: '12.5rem',
        overflowY: 'auto',
        width: '100%'
    });

    dialogContent.appendChild(messages);

    const spinnerContainerContainer = document.createElement('div');
    spinnerContainerContainer.id = 'spinnerContainerContainer';
    dialogContent.appendChild(spinnerContainerContainer)

    const  input = document.createElement('textarea');
    input.placeholder = translations[lang].toplaceholder ;
    input.id = 'userTextSpace';

    Object.assign(input.style, {
        width: '95%',
        padding: '0.625rem',
        marginTop: '1.25rem',
        marginBottom: '0.625rem',
        textAlign: 'left',
        border: `0.0625rem solid ${Color.institucional}`,
        fontSize: '1rem',
        borderRadius: '0.625rem',
        outline: 'none',
        overflowY: 'hidden',
        minHeight: '1.5rem',
        maxHeight: '10rem',
        resize: 'none'
    });

    
    dialogContent.appendChild(input);
    document.getElementById('userTextSpace').onfocus = () => input.style.border = `0.0625rem solid ${Color.institucional}`; 

    const welcome = document.createElement('div');
    welcome.innerHTML = `<p style="font-size:0.625rem;">${translations[lang].personalWelcomeMessage ?? translations[lang].welcomeMessage}</p>`;
    Object.assign(welcome.style, {
        fontSize: '0.625rem',
        margin: '0',
        color: Color.institucional,
        textAlign: 'left',
        backgroundColor: Color.lightGrey,
        padding: '0.3125rem 0.625rem',
        borderRadius: '0.625rem'
    });

    messages.appendChild(welcome);


    manageEntryUser(input, messages);
};

const manageEntryUser = (input, messages) => {

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const userMessage = sanitizeInput(input.value);
            const userMessageShow = input.value;
            input.value = '';

            const userMessageElement = document.createElement('div');
            userMessageElement.innerText = userMessageShow;
            Object.assign(userMessageElement.style, {
                margin: '0.625rem 0',
                textAlign: 'right',
                backgroundColor: Color.lightPurple,
                color: Color.white,
                padding: '0.3125rem 1.25rem',
                borderRadius: '0.625rem',
                fontSize: '0.625rem'
            });

            messages.appendChild(userMessageElement);

            setTimeout(() => {
                messages.scrollTop = messages.scrollHeight;
            }, 0);

            const botMessage = await sendMessageToBotPress(userMessage);
            const botMessageElement = document.createElement('div');
            botMessageElement.innerHTML = botMessage?.text 
                ? `<p style="font-size:0.625rem;">${botMessage.text}</p>` 
                : `<p style="font-size:0.625rem;">${translations[lang].botNoAnswer}</p>`;

            Object.assign(botMessageElement.style, {
                margin: '0.625rem 0',
                color: Color.institucional,
                textAlign: 'left',
                backgroundColor: Color.lightGrey,
                padding: '0.625rem 1.25rem',
                borderRadius: '0.625rem'
            });

            messages.appendChild(botMessageElement);
            createFeedbackButtons(botMessageElement, botMessage, userMessage); 

            setTimeout(() => {
                messages.scrollTop = messages.scrollHeight;
            }, 0);
        }
    });
};


const createDialog = () => {

    const curtainOverlayDialog = document.createElement('div');
    curtainOverlayDialog.id = 'curtainOverlayDialog'; 
    Object.assign(curtainOverlayDialog.style, {
        display: 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '10',
        backgroundColor: '#80808066',
    });

    const dialog = document.createElement('div');
    Object.assign(dialog.style, {
        display: 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        backgroundColor: '#f5f5f5',
        border: '0.0625rem solid #ccc',
        borderRadius: '0.3125rem',
        boxShadow: '0 0 0.9375rem 0.3125rem rgba(0, 0, 0, 0.1)',
        zIndex: '1001',
        padding: '1.25rem 1.25rem 0.625rem 1.25rem'
    });

    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    Object.assign(closeButton.style, {
    position: 'absolute',
    top: '0.625rem',
    right: '0.625rem',
    cursor: 'pointer',
    fontSize: '1.25rem',
    color: Color.institucional
    });

    closeButton.addEventListener('click', () => dialog.style.display = 'none');
    
    dialog.appendChild(closeButton);
    curtainOverlayDialog.appendChild(dialog);
    document.getElementById('iframeDiv').appendChild(curtainOverlayDialog);
    return [dialog, curtainOverlayDialog];
};

const createMiniModal = (userMessage, botMessage, isPositive) => {

    const { conversationId, messageId, userId , text: answer} = botMessage
    const question = userMessage

    const miniModal = document.createElement('div');
    Object.assign(miniModal.style, {
        position: 'absolute',
        top: '40%',
        right: '20%',
        transform: 'translate(-50%, -50%)',
        background: Color.white,
        border: `0.0625rem solid ${Color.institucional}`,
        borderRadius: '0.625rem',
        padding: '0.9375rem',
        boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,0.1)',
        zIndex: '1003'
    });

    const textarea = document.createElement('textarea');
    textarea.rows = 4;
    textarea.cols = 30;
    textarea.placeholder = translations[lang].writeFeedback;

    Object.assign(textarea.style, {
        marginBottom: '0.625rem',
        fontSize: '0.5rem',
        outline: 'none'
    });

    const sendBtn = document.createElement('button');
    sendBtn.textContent = translations[lang].send;
    Object.assign(sendBtn.style, {
        marginRight: '0.5rem',
        fontSize: '0.5rem',
        color: Color.white,
        backgroundColor: Color.institucional,
        borderRadius: '0.625rem',
        padding: '0.3125rem 0.625rem',
        border: `0.0625rem solid ${Color.institucional}`
    });


    const cancelBtn = document.createElement('button');
    Object.assign(cancelBtn.style, {
        fontSize: '0.5rem',
        padding: '0.3125rem 0.625rem',
        backgroundColor: Color.white,
        border: `0.0625rem solid ${Color.institucional}`,
        borderRadius: '0.625rem'
    });

    cancelBtn.textContent = translations[lang].cancel;


    cancelBtn.onclick = () => {
        document.getElementById('userTextSpace').focus();
        miniModal.remove();
    }
    sendBtn.onclick = () => {
        const feedBack = sanitizeInput(textarea.value);
        console.log('Feedback enviado:', feedBack);
        sendFeedback (answer, conversationId, messageId, userId, isPositive, question, feedBack);
        miniModal.remove();
        document.getElementById('userTextSpace').focus();
        document.getElementById('thxresponseDiv').textContent = translations[lang].thxFeedback;
    };

    miniModal.appendChild(textarea);
    miniModal.appendChild(document.createElement('br'));
    miniModal.appendChild(sendBtn);
    miniModal.appendChild(cancelBtn);
    document.body.appendChild(miniModal);
    textarea.focus();
    return;
}

const sendFeedback = async (answer, conversationId, messageId, userId, isPositive, question, feedBack = "null") => {

    const headers = {
        "x-bot-id": config.xBotId,
        "x-workspace-id": config.xWorkspaceId,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.bearerToken}`
    };

    const rowData = {conversationId, messageId, userId,answer, isPositive, feedBack, question, };

    try {
        const findUrl = `${config.botpressApiUrl}/tables/${config.table}/rows/find`;
        const findResponse = await fetch(findUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({
                limit: 1,
                offset: 0,
                filter: { messageId },
                orderBy: "id",
                orderDirection: "asc"
            })
        });

        if (!findResponse.ok) {
            const errorBody = await findResponse.text();
            console.error("Error to find the row", errorBody);
            throw new Error(translations[lang].ErrCheckFeedback);
        }

        const data = await findResponse.json();
        const existingRow = data.rows?.[0];
        console.log("Row find it!", existingRow);

        const actionUrl = `${config.botpressApiUrl}/tables/${config.table}/rows`;

        const method = existingRow ? "PUT" : "POST";
        const message = existingRow ? 'Actualizado' : 'creado'
        const body = existingRow
        ? JSON.stringify({ rows: [{ id: existingRow.id, ...rowData }] })
        : JSON.stringify({ rows: [rowData] });


        const response = await fetch(actionUrl, { method, headers, body });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Error al guardar feedback:", errorBody);
            throw new Error(translations[lang].ErrSendFeedback);
        }

        console.log(translations[lang].feedbackSendOK);
        console.log(message);
    } catch (error) {
        console.error(translations[lang].erroRequest, error);
    }
}

const sendMessageToBotPress = async (message) => {
    try {

        const spinnerContainerContainer = document.getElementById('spinnerContainerContainer');
        const spinner = createSpinner(spinnerContainerContainer);

        let userKey = localStorage.getItem("botpress_user_key");
        let conversationId = localStorage.getItem("botpress_conversation_id");
        let userId = localStorage.getItem("botpress_user_id");

        if (!userKey) {
            const response = await fetch(`${config.botpressUrl}/${config.botpressWebhookId}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });
            const data = await response.json();
            userKey = data.key;
            userId = data.user.id;
            localStorage.setItem("botpress_user_key", userKey);
            localStorage.setItem("botpress_user_id", userId);
        }
        
        if (!conversationId) {
            const response = await fetch(`${config.botpressUrl}/${config.botpressWebhookId}/conversations`, {
                method: "POST",
                headers: {  "x-user-key": userKey,
                            "Content-Type": "application/json" },
                body: JSON.stringify({})

            });
            const data = await response.json();
            conversationId = data.conversation.id;
            localStorage.setItem("botpress_conversation_id", conversationId);
        }

        const sentMessageTimestamp = new Date().toISOString();
        await fetch(`${config.botpressUrl}/${config.botpressWebhookId}/messages`, {
            method: "POST",
            headers: { "x-user-key": userKey, "Content-Type": "application/json" },
            body: JSON.stringify({
                payload: { type: "text", text: message },
                conversationId,
            })
        });

        // Obtener respuesta del bot
        const getBotResponse = async () => {
            for (let retries = 60; retries > 0; retries--) {
                const response = await fetch(
                    `${config.botpressUrl}/${config.botpressWebhookId}/conversations/${conversationId}/messages`,
                    {
                        method: "GET",
                        headers: { "x-user-key": userKey, "accept": "application/json" }
                    }
                );
                const data = await response.json();

                const botMessages = data.messages.filter(
                    (msg) => msg.createdAt > sentMessageTimestamp && msg.userId !== userId
                );

                if (botMessages.length) {
                    const text = botMessages[botMessages.length - 1].payload.text

                    const convertToLinks = (text) => {
                        const regex = /\[(.*?)\]\((https?:\/\/[^\)]+)\)/g;
                    
                        return text.replace(regex, (match, text, url) => {
                            return `<a href="${url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="text-decoration: none;
                            color: inherit;
                            cursor: pointer;">${text}</a>`;
                        });
                    }
                    return {
                        text: convertToLinks(text),
                        messageId: botMessages[botMessages.length - 1].id,
                        conversationId: botMessages[botMessages.length - 1].conversationId,
                        userId: botMessages[botMessages.length - 1].userId,
                    };
                }

                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
            return { text: translations[lang].botNoAnswer};
        };
        
        const dataRes = await getBotResponse();
        spinner.remove();
        return dataRes;
        
    } catch (error) {
        const spinnerContainer = document.querySelector('#spinnerContainer');
        if (spinnerContainer) spinnerContainer.remove();
        console.error(translations[lang].errorInteracting, error);
        return { text: translations[lang].errorComunication};
    }
};

const handleButtonClick = (imagen, dialog, curtainOverlayDialog) => {
    imagen.addEventListener('click', () => {
        const isHidden = dialog.style.display === 'none' || dialog.style.display === '';
        dialog.style.display = curtainOverlayDialog.style.display = isHidden ? 'block' : 'none';
        document.getElementById('userTextSpace').focus();
    });
};

const initializeChatbot = () => {
    const imagenBoton = createImageButton();
    const [dialog, curtainOverlayDialog] = createDialog();
    handleButtonClick(imagenBoton, dialog, curtainOverlayDialog);
    addContentDialog(dialog);
};

const createSpinner = (container) => {
    const spinnerContainer = document.createElement('div');
    spinnerContainer.id = 'spinnerContainer';
    Object.assign(spinnerContainer.style, {
        display: 'inline-block',
        width: '1.875rem',
        textAlign: 'center'
    });

    for (let i = 1; i <= 3; i++) {
        const dot = document.createElement('div');
        Object.assign(dot.style, {
            display: 'inline-block',
            width: '0.1875rem',
            height: '0.1875rem',
            margin: '0 0.125rem',
            backgroundColor: '#333',
            borderRadius: '50%',
            animation: 'dots-spinner 1.2s infinite ease-in-out both'
        });

        dot.style.animationDelay = i === 1 ? '-0.32s' : i === 2 ? '-0.16s' : '0s';
        spinnerContainer.appendChild(dot);
    }

    const keyframes = `
        @keyframes dots-spinner {
            0%, 80%, 100% {
                transform: scale(0); /* Escala inicial y final */
            }
            40% {
                transform: scale(1); /* Escala máxima */
            }
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = keyframes;
    document.head.appendChild(styleSheet);
    container.appendChild(spinnerContainer);
    return spinnerContainer;
};

const createFeedbackButtons = (container, botMessage, userMessage) => {
    let isPositive = true;
    let canSend = true;
    const { conversationId, messageId, userId , text: answer} = botMessage
    const question = userMessage;
    const feedbackContainer = document.createElement('div');
    feedbackContainer.id = 'feedbackContainer';
    Object.assign(feedbackContainer.style, {
        display: 'flex',
        width: 'auto',
        height: '0.3125rem',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.3125rem',
        borderRadius: '0 0 0.5rem 0.5rem'
    });

    const feedbackText = document.createElement('div');
    feedbackText.id = 'feedbackText';
    Object.assign(feedbackText.style, {
        textAlign: 'center',
        marginTop: '0.3125rem',
        color: '#662483',
        fontSize: '0.875rem',
        height: '0.3125rem',
        fontWeight: '500',
        transition: 'all 0.3s ease'
    });

    const thxresponseDiv = document.createElement('div');
    thxresponseDiv.id = 'thxresponseDiv';
    Object.assign(thxresponseDiv.style, {
        height: '0.3125rem',
        marginLeft: '0.3125rem',
        width: 'fit-content',
        fontSize: '0.5rem',
        color: '#AAA'
    });
    thxresponseDiv.textContent = translations[lang].helpUsImprove;


    const thumbsUp = document.createElement('div');
    thumbsUp.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="0.625rem" height="0.625rem" fill="currentColor" viewBox="0 0 24 24" style="opacity: 0.3;"><path d="M2 21h4V9H2v12zM23 10.5c0-.8-.3-1.5-.9-2.1-.6-.6-1.3-.9-2.1-.9h-6.4l1-4.6.1-.5c0-.4-.2-.8-.4-1.1L14 1 7.6 7.4C7.2 7.8 7 8.4 7 9v10c0 1.1.9 2 2 2h7.6c.8 0 1.5-.3 2.1-.9.6-.6.9-1.3.9-2.1 0-.3-.1-.7-.2-1 .5-.3.9-.7 1.2-1.2.3-.5.4-1 .4-1.5 0-.3 0-.7-.1-1 .5-.3.9-.7 1.2-1.2.3-.5.4-1 .4-1.5z"/></svg>`;
    Object.assign(thumbsUp.style, {
        color: 'rgba(0, 0, 0, 0.3)',
        height: '0.3125rem',
        fontSize: '0.625rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    });

    const thumbsDown = document.createElement('div');
    thumbsDown.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="0.625rem" height="0.625rem" fill="currentColor" viewBox="0 0 24 24" style="opacity: 0.3;"><path d="M2 3h4v12H2V3zm21 10.5c0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9h-6.4l1 4.6.1.5c0 .4-.2.8-.4 1.1L14 23l-6.4-6.4c-.4-.4-.6-1-.6-1.6V5c0-1.1.9-2 2-2h7.6c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1 0 .3-.1.7-.2 1 .5.3.9.7 1.2 1.2.3.5.4 1 .4 1.5 0 .3 0 .7-.1 1 .5.3.9.7 1.2 1.2.3.5.4 1 .4 1.5z"/></svg>`;

    Object.assign(thumbsDown.style, {
        opacity: '0.3',
        height: '0.3125rem',
        fontSize: '0.625rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    });

    thumbsUp.addEventListener('mouseenter', () => {
    if (canSend) {
        thumbsUp.style.transform = 'scale(1.1)';
        thumbsUp.style.backgroundColor = '#D3D3D3';
        thumbsUp.style.color = '#662483';
        thxresponseDiv.style.color = '#4285f4';
        thxresponseDiv.textContent = translations[lang].helpfull;
        feedbackText.style.display = 'flex';
        feedbackText.style.justifyContent = 'flex-start';
        feedbackText.style.fontSize = '0.5rem';
    }
    });

    thumbsUp.addEventListener('mouseleave', () => {
    if (canSend) {
        thumbsUp.style.transform = 'scale(1)';
        thumbsUp.style.backgroundColor = 'transparent';
        thumbsUp.style.color = 'inherit';
        feedbackText.textContent = '';
        thxresponseDiv.style.color = '#AAA';
        thxresponseDiv.textContent = translations[lang].empty;
    }
    });

    thumbsDown.addEventListener('mouseenter', () => {
    if (canSend) {
        thumbsDown.style.transform = 'scale(1.1)';
        thumbsDown.style.backgroundColor = '#D3D3D3';
        thumbsDown.style.color = Color.institucional;
        thxresponseDiv.style.color = '#ea4335';
        thxresponseDiv.textContent = translations[lang].dontHelpfull;
        feedbackText.style.fontSize = '0.5rem';
    }
    });

    thumbsDown.addEventListener('mouseleave', () => {
    if (canSend) {
        thumbsDown.style.transform = 'scale(1)';
        thumbsDown.style.backgroundColor = 'transparent';
        thumbsDown.style.color = 'inherit';
        feedbackText.textContent = '';
        thxresponseDiv.style.color = '#AAA';
        thxresponseDiv.textContent = translations[lang].empty;
    }
    });

    thumbsDown.addEventListener('click', () => {
    if (canSend) {
        thumbsDown.style.backgroundColor = '#f9d5d5';
        thxresponseDiv.textContent = translations[lang].sorryDontHelpfull;
        isPositive = false;
        thumbsDown.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="0.8125rem" height="0.8125rem" fill="${Color.institucional}" viewBox="0 0 24 24" style="opacity: 1;">
        <path d="M2 3h4v12H2V3zm21 10.5c0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9h-6.4l1 4.6.1.5c0 .4-.2.8-.4 1.1L14 23l-6.4-6.4c-.4-.4-.6-1-.6-1.6V5c0-1.1.9-2 2-2h7.6c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1 0 .3-.1.7-.2 1 .5.3.9.7 1.2 1.2.3.5.4 1 .4 1.5 0 .3 0 .7-.1 1 .5.3.9.7 1.2 1.2.3.5.4 1 .4 1.5z"/>
        </svg>`;
        thxresponseDiv.style.color = '#662483';
        thumbsDown.disabled = true;
        thumbsUp.disabled = true;
        const feedBack = createMiniModal(userMessage, botMessage, isPositive);
        sendFeedback(answer, conversationId, messageId, userId, isPositive, question, feedBack);
        canSend = false;
    }
    });

    thumbsUp.addEventListener('click', () => {
        if (canSend) {
            thumbsUp.style.backgroundColor = '#d2e3fc';
            thxresponseDiv.textContent = translations[lang].thxFeedback;
            isPositive = true;
            thumbsUp.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="0.8125rem" height="0.8125rem" fill="${Color.institucional}" viewBox="0 0 24 24" style="opacity: 0.3;">
            <path d="M2 21h4V9H2v12zM23 10.5c0-.8-.3-1.5-.9-2.1-.6-.6-1.3-.9-2.1-.9h-6.4l1-4.6.1-.5c0-.4-.2-.8-.4-1.1L14 1 7.6 7.4C7.2 7.8 7 8.4 7 9v10c0 1.1.9 2 2 2h7.6c.8 0 1.5-.3 2.1-.9.6-.6.9-1.3.9-2.1 0-.3-.1-.7-.2-1 .5-.3.9-.7 1.2-1.2.3-.5.4-1 .4-1.5 0-.3 0-.7-.1-1 .5-.3.9-.7 1.2-1.2.3-.5.4-1 .4-1.5z"/>
            </svg>`;
            thxresponseDiv.style.color = Color.institucional;
            thumbsDown.disabled = true;
            thumbsUp.disabled = true;
            const feedBack = createMiniModal(userMessage, botMessage, isPositive);
            sendFeedback(answer, conversationId, messageId, userId, isPositive, question, feedBack);
            canSend = false;
        }
    });


    feedbackContainer.appendChild(thumbsUp);
    feedbackContainer.appendChild(thumbsDown);
    feedbackContainer.appendChild(thxresponseDiv);
    container.appendChild(feedbackContainer);
    thxresponseDiv.appendChild(feedbackText);
};

function sanitizeInput(input) {
    if (typeof input !== 'string') throw new Error(translations[lang].textareaerr);
    let sanitized = input
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/&/g, '&amp;')
        .replace(/\//g, '&#47;')

    sanitized = sanitized
        .replace(/\(/g, '&#40;')
        .replace(/\)/g, '&#41;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;')
        .replace(/;/g, '&#59;')

    const forbiddenWords = ['script', 'iframe', 'javascript:', 'onerror'];
    if (forbiddenWords.some(word => sanitized.toLowerCase().includes(word))) throw new Error(translations[lang].nopermes);
    return sanitized;
}

function createImageButton() {
    const contenedor = document.createElement('div');
    Object.assign(contenedor.style, {
        position: 'fixed',
        bottom: '0.625rem',
        right: '6.25rem',
        zIndex: '1000',
        width: '6.25rem',
        height: '6.25rem',
        cursor: 'pointer'
    });

    const imagen = document.createElement('img');
    imagen.id = 'personalImg';
    imagen.src = personalizeImg.img.eurecat;

    Object.assign(imagen.style, {
        height: '30%',
        objectFit: 'contain',
        filter: 'drop-shadow(0.3125rem 0.3125rem 0.625rem rgba(0, 0, 0, 0.2))'
    });

    contenedor.appendChild(imagen);
    document.body.appendChild(contenedor);
    
    return contenedor;
}

document.addEventListener("DOMContentLoaded", initializeChatbot);



