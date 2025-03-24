import { RiShareLine } from 'react-icons/ri';

const ShareButton = ({ title, text, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title:"Kosten - Aventuras Ilimitadas",
          text: "Mira este contenido",
          url: url,
        });
        console.log('Contenido compartido con éxito');
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert('El navegador no es compatible.');
    }
  };

  return (
    <div onClick={handleShare} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      <RiShareLine style={{ width: 20, height:20, display:'flex', alignContent:'center', margin: '1' }} />
    </div>
  );
};

export default ShareButton;