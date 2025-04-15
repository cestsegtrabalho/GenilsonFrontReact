import React from 'react';

const CompartilharSimples = ({ linkUrl, nameprova }) => {
  const handleShareSimples = () => {
    if (linkUrl) {
      const modifiedUrl = linkUrl.replace('/prova/', '/provasimples/');
      const mensagem = `*PROVA ${nameprova}* \n\n${modifiedUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      console.error('URL inválida para compartilhar:', linkUrl);
    }
  };

  return (
    <button onClick={handleShareSimples}>
      Compartilhar Sem Formulário
    </button>
  );
};

export default CompartilharSimples;
