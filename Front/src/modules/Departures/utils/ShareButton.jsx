import { Container } from '@mui/material';
import React from 'react';
import { RiShareLine } from 'react-icons/ri';

const ShareButton = ({ title, text, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log('Contenido compartido con éxito');
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert('La API de Web Share no es compatible con este navegador.');
    }
  };

  return (
    <div onClick={handleShare} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      <RiShareLine style={{ width: 20, height:20, display:'flex', alignContent:'center', margin: '1' }} />
    </div>
  );
};

export default ShareButton;