import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Users, FileText, User, Mail, Phone, MapPin } from "lucide-react";
import { ModernTechButton } from "@/components/ModernTechButton";
import GlobalTranslator from "@/components/GlobalTranslator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Form validation schema
const ulkeEkleSchema = z.object({
  // Ülke bilgileri
  ulkeAdi: z.string().min(2, "Ülke adı en az 2 karakter olmalıdır"),
  ulkeKodu: z.string().min(2, "Ülke kodu en az 2 karakter olmalıdır").max(3, "Ülke kodu en fazla 3 karakter olmalıdır"),
  dilAdi: z.string().min(2, "Dil adı en az 2 karakter olmalıdır"),
  yerelDilAdi: z.string().min(1, "Yerel dil adı gereklidir"),
  
  // Başvuru nedenleri
  basvuruNedeni: z.string().min(50, "Başvuru nedeni en az 50 karakter olmalıdır"),
  halkinDurumu: z.string().min(50, "Halkın durumu açıklaması en az 50 karakter olmalıdır"),
  
  // Kişisel bilgiler
  ad: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  soyad: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  telefon: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  
  // Aile bilgileri
  aileBilgileri: z.string().optional(),
  yasadigiUlke: z.string().min(2, "Yaşadığı ülke bilgisi gereklidir"),
  adres: z.string().min(10, "Adres bilgisi en az 10 karakter olmalıdır"),
  
  // Ek bilgiler
  destekleyiciDokuman: z.string().optional(),
  iletisimTercihi: z.enum(["email", "telefon", "her-ikisi"]),
});

type UlkeEkleFormData = z.infer<typeof ulkeEkleSchema>;

export default function UlkeEklePage() {
  const [, navigate] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UlkeEkleFormData>({
    resolver: zodResolver(ulkeEkleSchema),
    defaultValues: {
      iletisimTercihi: "email",
    },
  });

  const onSubmit = async (data: UlkeEkleFormData) => {
    setIsSubmitting(true);
    try {
      // Form verilerini console'a yazdır (geliştirme amaçlı)
      // Country application submitted
      
      // Burada API çağrısı yapılabilir
      // await apiRequest("POST", "/api/ulke-basvuru", data);
      
      // Başarılı mesajı göster
      alert("Başvurunuz başarıyla alındı. En kısa sürede değerlendirilecektir.");
      
      // Ana sayfaya yönlendir
      navigate("/dil-secimi");
    } catch (error) {
      // Application submission error
      alert("Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
      <div className="container-mobile py-4 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <button
              onClick={() => navigate("/dil-secimi")}
              className="flex items-center gap-2 px-3 py-2 bg-black/60 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg floating-element text-white hover:text-red-100 nav-button touch-target"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Geri</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="inline-block px-3 sm:px-4 py-2 bg-red-950/30 border border-red-500/40 rounded-lg mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-red-400 tracking-wide uppercase">
                Küresel Dayanışma Platformu
              </span>
            </div>
            <h1 className="heading-mobile text-white mb-3 sm:mb-4">
              Ezilmiş Tüm Halkların
            </h1>
            <h2 className="subheading-mobile text-red-500 mb-4 sm:mb-6">
              Ortak Başvuru Platformu
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Dünyanın her yerinden ezilen halkların sesini duyurmak, adalet arayışlarını desteklemek 
              ve ortak mücadele platformu oluşturmak için buraya başvurabilirsiniz.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="form-mobile">
            
            {/* Ülke Bilgileri */}
            <Card className="bg-black/40 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
                  Ülke ve Dil Bilgileri
                </CardTitle>
                <CardDescription className="text-gray-400 body-mobile">
                  Temsil ettiğiniz ülke ve dilin bilgilerini giriniz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ulkeAdi" className="text-white text-sm sm:text-base">Ülke Adı</Label>
                    <Input
                      id="ulkeAdi"
                      {...form.register("ulkeAdi")}
                      placeholder="Örn: Doğu Türkistan"
                      className="input-mobile bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.ulkeAdi && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.ulkeAdi.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="ulkeKodu" className="text-white text-sm sm:text-base">Ülke Kodu</Label>
                    <Input
                      id="ulkeKodu"
                      {...form.register("ulkeKodu")}
                      placeholder="Örn: ET"
                      className="input-mobile bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.ulkeKodu && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.ulkeKodu.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="dilAdi" className="text-white text-sm sm:text-base">Dil Adı (İngilizce)</Label>
                    <Input
                      id="dilAdi"
                      {...form.register("dilAdi")}
                      placeholder="Örn: Uyghur"
                      className="input-mobile bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.dilAdi && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.dilAdi.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="yerelDilAdi" className="text-white text-sm sm:text-base">Yerel Dil Adı</Label>
                    <Input
                      id="yerelDilAdi"
                      {...form.register("yerelDilAdi")}
                      placeholder="Örn: ئۇيغۇرچە"
                      className="input-mobile bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.yerelDilAdi && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.yerelDilAdi.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Başvuru Nedenleri */}
            <Card className="bg-black/40 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-500" />
                  Başvuru Nedenleri
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Neden bu platforma katılmak istediğinizi detaylı olarak açıklayınız
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="basvuruNedeni" className="text-white">Başvuru Nedeni</Label>
                  <Textarea
                    id="basvuruNedeni"
                    {...form.register("basvuruNedeni")}
                    placeholder="Halkınızın yaşadığı zorluklar, adaletsizlikler ve neden bu platforma ihtiyaç duyduğunuzu detaylı olarak açıklayın..."
                    className="bg-black/20 border-red-500/30 text-white min-h-[120px]"
                  />
                  {form.formState.errors.basvuruNedeni && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.basvuruNedeni.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="halkinDurumu" className="text-white">Halkın Mevcut Durumu</Label>
                  <Textarea
                    id="halkinDurumu"
                    {...form.register("halkinDurumu")}
                    placeholder="Halkınızın demografik durumu, yaşadığı coğrafya, karşılaştığı sorunlar ve mücadele alanları hakkında bilgi verin..."
                    className="bg-black/20 border-red-500/30 text-white min-h-[120px]"
                  />
                  {form.formState.errors.halkinDurumu && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.halkinDurumu.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Kişisel Bilgiler */}
            <Card className="bg-black/40 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-red-500" />
                  Kişisel Bilgiler
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Başvuru sahibinin kişisel bilgileri
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ad" className="text-white">Ad</Label>
                    <Input
                      id="ad"
                      {...form.register("ad")}
                      placeholder="Adınız"
                      className="bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.ad && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.ad.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="soyad" className="text-white">Soyad</Label>
                    <Input
                      id="soyad"
                      {...form.register("soyad")}
                      placeholder="Soyadınız"
                      className="bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.soyad && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.soyad.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      E-posta
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="ornek@email.com"
                      className="bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="telefon" className="text-white flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Telefon
                    </Label>
                    <Input
                      id="telefon"
                      {...form.register("telefon")}
                      placeholder="+90 555 123 45 67"
                      className="bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.telefon && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.telefon.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Aile Bilgileri */}
            <Card className="bg-black/40 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-500" />
                  Aile ve Yaşam Bilgileri
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Aile durumu ve yaşadığınız yer bilgileri
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aileBilgileri" className="text-white">Aile Bilgileri (İsteğe bağlı)</Label>
                  <Textarea
                    id="aileBilgileri"
                    {...form.register("aileBilgileri")}
                    placeholder="Aile üyeleriniz, durumları ve bu konudaki hassasiyetleriniz hakkında bilgi verebilirsiniz..."
                    className="bg-black/20 border-red-500/30 text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yasadigiUlke" className="text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Şu An Yaşadığı Ülke
                    </Label>
                    <Input
                      id="yasadigiUlke"
                      {...form.register("yasadigiUlke")}
                      placeholder="Türkiye"
                      className="bg-black/20 border-red-500/30 text-white"
                    />
                    {form.formState.errors.yasadigiUlke && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.yasadigiUlke.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="iletisimTercihi" className="text-white">İletişim Tercihi</Label>
                    <select
                      id="iletisimTercihi"
                      {...form.register("iletisimTercihi")}
                      className="w-full px-3 py-2 bg-black/20 border border-red-500/30 rounded-md text-white"
                    >
                      <option value="email">E-posta</option>
                      <option value="telefon">Telefon</option>
                      <option value="her-ikisi">Her İkisi</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="adres" className="text-white">Adres</Label>
                  <Textarea
                    id="adres"
                    {...form.register("adres")}
                    placeholder="Tam adresinizi yazın..."
                    className="bg-black/20 border-red-500/30 text-white"
                  />
                  {form.formState.errors.adres && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.adres.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ek Bilgiler */}
            <Card className="bg-black/40 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-500" />
                  Ek Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="destekleyiciDokuman" className="text-white">Destekleyici Doküman/Kaynaklar (İsteğe bağlı)</Label>
                  <Textarea
                    id="destekleyiciDokuman"
                    {...form.register("destekleyiciDokuman")}
                    placeholder="Durumunuzu destekleyen haberler, raporlar, belgeler veya diğer kaynakların linklerini paylaşabilirsiniz..."
                    className="bg-black/20 border-red-500/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-4 sm:pt-6">
              <ModernTechButton
                type="submit"
                variant="turkish"
                size="xl"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-bold touch-target"
              >
                {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
              </ModernTechButton>
            </div>
          </form>
        </motion.div>
      </div>
      
      {/* Global Translation System */}
      <GlobalTranslator />
    </div>
  );
}