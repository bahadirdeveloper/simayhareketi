import { useState } from 'react';

const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    // Basit bir yaklaşım: Butona tıklandığında sayfada bir audio elementi oluştur
    const audioElement = document.createElement('audio');
    audioElement.src = '/music/giris.mp3';
    audioElement.volume = 0.5;
    audioElement.loop = true;
    audioElement.id = 'background-music-element';
    
    // Çalma dene
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Başarılı
          console.log('Müzik başarıyla çalınıyor!');
          setIsPlaying(true);
          document.body.appendChild(audioElement);
        })
        .catch((error) => {
          // Başarısız - kullanıcı etkileşimi sınırlaması olabilir
          console.error('Müzik çalma hatası:', error);
          
          // Farklı bir yöntem dene - bir button oluştur ve ona tıkla
          const button = document.createElement('button');
          button.innerHTML = 'Ses İzni';
          button.style.position = 'fixed';
          button.style.bottom = '20px';
          button.style.right = '20px';
          button.style.zIndex = '9999';
          
          button.onclick = () => {
            audioElement.play()
              .then(() => {
                button.remove();
                setIsPlaying(true);
                document.body.appendChild(audioElement);
              })
              .catch(err => console.error('Son girişim de başarısız oldu:', err));
          };
          
          document.body.appendChild(button);
        });
    }
  };

  return (
    <button 
      onClick={playAudio}
      className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-red-700 to-red-900 rounded-full shadow-lg mb-3 hover:from-red-600 hover:to-red-800 transition-all duration-300 cursor-pointer"
      aria-label="Müzik çal"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-8 w-8 text-white"
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M8 5.14v14l11-7-11-7z" />
      </svg>
    </button>
  );
};

export default PlayButton;