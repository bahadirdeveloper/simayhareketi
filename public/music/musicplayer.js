// Müzik çalma işlemini yönetir
function playTurkishMusic() {
  try {
    // Müzik dosyasının konumu
    const audioFile = '/music/giris.mp3';
    
    // Eğer zaten bir müzik çalıyorsa durdur
    const existingPlayer = document.getElementById('turkish-national-anthem');
    if (existingPlayer) {
      document.body.removeChild(existingPlayer);
    }
    
    // Yeni bir audio elementi oluştur
    const audioPlayer = new Audio(audioFile);
    audioPlayer.id = 'turkish-national-anthem';
    audioPlayer.volume = 0.7;
    audioPlayer.loop = true;
    
    // Çalmayı dene
    audioPlayer.play()
      .then(() => console.log('Müzik başladı'))
      .catch(error => console.error('Müzik çalma hatası:', error));
    
    // Döküman kapatıldığında müziği durdur
    window.addEventListener('beforeunload', () => {
      audioPlayer.pause();
      audioPlayer.src = '';
    });
    
  } catch (error) {
    console.error('Ses sistemi hatası:', error);
  }
}

// Global olarak erişilebilir
window.playTurkishMusic = playTurkishMusic;