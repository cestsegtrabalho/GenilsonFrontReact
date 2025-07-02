import React from 'react';

const CompartilharSimplesCURSO = ({ linkUrl, namecurso }) => {
  const handleShareSimples = () => {
    if (linkUrl) {
      const modifiedUrl = linkUrl.replace('/curso/', '/cursosimples/');
      const mensagem = `*CURSO ${namecurso}* \n\n${modifiedUrl}`;
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

export default CompartilharSimplesCURSO;
