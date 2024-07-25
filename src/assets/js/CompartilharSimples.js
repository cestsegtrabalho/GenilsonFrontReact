import React from 'react';

const CompartilharSimples = ({ linkUrl }) => {
  const handleShareSimples = () => {
    if (linkUrl) {
      const modifiedUrl = linkUrl.replace('/prova/', '/provasimples/');
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(modifiedUrl)}`;
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
