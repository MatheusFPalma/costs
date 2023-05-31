import React from 'react';

function WhatsAppLink() {
    const phoneNumber = '5511979682009';
    const message = 'Olá, quero entrar em contato.';

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button onClick={handleClick}>
            Enviar mensagem no WhatsApp
        </button>
    );
}

export default WhatsAppLink;
