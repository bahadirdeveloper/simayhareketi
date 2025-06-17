import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Play, Volume2, VolumeX, Globe, Users, BookOpen, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ModernLayout from '@/components/ModernLayout';
import { navigateWithScrollReset } from '@/lib/navigation';

const NewHomePage = () => {
  const [, navigate] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState({
    participants: 0,
    totalAmount: 0,
    activeCities: 0,
    activeProjects: 100,
    volunteers: 0
  });

  useEffect(() => {
    // Fetch live stats
    fetch('/api/stats/live')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {
        // Keep default values on error
      });
  }, []);

  const handleNavigation = (path: string) => {
    navigateWithScrollReset(navigate, path);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ModernLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                  Cumhuriyet'in
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Güncelleme Platformu
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Bu, 19 Mayıs 2025'te yayına girecek olan küresel bir dijital bilinç ve adalet 
                sisteminin başlangıç ekranıdır. Halkların kardeşliği ve teknolojik görev sistemi 
                üzerine kurulacaktır.
              </p>

              {/* Audio Control */}
              <div className="flex justify-center mb-8">
                <Button
                  onClick={toggleAudio}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  19 Mayıs 2025 - Cumhuriyet'in Halk ile Güncelleme Yolculuğu
                </Button>
              </div>

              {/* Main Navigation Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                <Button
                  onClick={() => handleNavigation('/turkiye')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  TÜRKİYE
                </Button>
                <Button
                  onClick={() => handleNavigation('/manifesto')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  MANİFESTO
                </Button>
                <Button
                  onClick={() => handleNavigation('/cagri')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  ÇAĞRI
                </Button>
                <Button
                  onClick={() => handleNavigation('/katil')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  KATIL
                </Button>
                <Button
                  onClick={() => handleNavigation('/gorevler')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  GÖREV
                </Button>
                <Button
                  onClick={() => handleNavigation('/entegrasyon-sureci')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  ENTEGRASYON
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                CANLI İSTATİSTİKLER
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-lg p-6 mb-4">
                  <Users className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.participants.toLocaleString()}</div>
                </div>
                <p className="text-gray-300 font-medium">Katılımcılar</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 mb-4">
                  <Globe className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.activeCities}</div>
                </div>
                <p className="text-gray-300 font-medium">Aktif Şehirler</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-6 mb-4">
                  <BookOpen className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.activeProjects}</div>
                </div>
                <p className="text-gray-300 font-medium">Aktif Projeler</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-6 mb-4">
                  <Zap className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{Math.abs(stats.totalAmount).toLocaleString()} ₺</div>
                </div>
                <p className="text-gray-300 font-medium">Toplam Katkı</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                TEMEL DEĞERLER
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 backdrop-blur-sm rounded-xl p-8 border border-red-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Cumhuriyet'in Güncellenmesi</h3>
                <p className="text-gray-300 leading-relaxed">
                  Bu hep temel değer etrafında geliştirdiğimiz Cumhuriyet'in güncellenme teknolojisidir. 
                  Halkların kardeşliği ve teknolojik görev sistemi üzerine kurulmuştur.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Teknolojik Görev Sistemi</h3>
                <p className="text-gray-300 leading-relaxed">
                  100 görev sistemi ile halkların bilinçlenmesi ve organize olması için 
                  teknolojik altyapı sunuyoruz. Her görev, toplumsal dönüşümün bir parçasıdır.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Halkların Kardeşliği</h3>
                <p className="text-gray-300 leading-relaxed">
                  Küresel dayanışma platformu olarak, mazlum halkların birlikte mücadele 
                  edebileceği dijital bir ortam sağlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-red-600/20 to-blue-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              19 Mayıs 2025'te Başlayacak Yolculuğa Katıl
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Cumhuriyet'in güncellenmesi için gereken teknolojik altyapı ve halkların 
              kardeşliği sistemine katılmak için hemen üye ol.
            </p>
            <Button
              onClick={() => handleNavigation('/katil')}
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              PLATFORMA KATIL
            </Button>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
};

export default NewHomePage;