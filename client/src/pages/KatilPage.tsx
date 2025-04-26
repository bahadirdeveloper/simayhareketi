import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import AudioControl from "@/components/AudioControl";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  ad: z.string().min(2, {
    message: "Ad en az 2 karakter olmalıdır.",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz.",
  }),
  telefon: z.string().min(10, {
    message: "Geçerli bir telefon numarası giriniz.",
  }),
  sehir: z.string().min(2, {
    message: "Şehir bilgisi gereklidir.",
  }),
  katilimTipi: z.string({
    required_error: "Katılım tipi seçiniz.",
  }),
  mesaj: z.string().optional(),
});

export default function KatilPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ad: "",
      email: "",
      telefon: "",
      sehir: "",
      katilimTipi: "",
      mesaj: "",
    },
  });
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "katil"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);
  
  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Submit form
    try {
      // Here you would normally submit the form data to the backend
      
      toast({
        title: "Başarıyla gönderildi!",
        description: "Katılım talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.",
        variant: "destructive",
      });
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <SimpleBurningEarth />
      
      <main className="container mx-auto px-4 pb-16 z-10 relative">
        <div className="max-w-3xl mx-auto pt-16 pb-20">
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-6">
              KATILIM
            </h1>
            <p className="text-xl text-gray-200 mb-12">
              Cumhuriyetin Halk ile Güncellenme Platformu'na katılmak için formu doldurun
            </p>
          </motion.div>
          
          {/* Form */}
          <motion.div
            className="bg-black/60 backdrop-blur-sm border-2 border-amber-500 rounded-lg p-8 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Ad Soyad</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ad ve soyadınızı giriniz" 
                          {...field} 
                          className="bg-black/50 border-amber-500 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ornekmail@adres.com" 
                            type="email"
                            {...field} 
                            className="bg-black/50 border-amber-500 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telefon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Telefon</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="05XX XXX XX XX" 
                            {...field} 
                            className="bg-black/50 border-amber-500 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="sehir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Şehir</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Yaşadığınız şehir" 
                            {...field} 
                            className="bg-black/50 border-amber-500 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="katilimTipi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Katılım Tipi</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-amber-500 text-white">
                              <SelectValue placeholder="Katılım tipi seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/90 border-amber-500 text-white">
                            <SelectItem value="gonullu">Gönüllü Katılımcı</SelectItem>
                            <SelectItem value="teknik">Teknik Ekip</SelectItem>
                            <SelectItem value="organizasyon">Organizasyon Ekibi</SelectItem>
                            <SelectItem value="icerik">İçerik Üretimi</SelectItem>
                            <SelectItem value="diger">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="mesaj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Mesajınız (Opsiyonel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Katılım amacınızı, yeteneklerinizi veya sorularınızı yazabilirsiniz." 
                          {...field} 
                          className="bg-black/50 border-amber-500 text-white h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-700 to-amber-600 hover:from-amber-600 hover:to-red-700 text-white py-6 text-lg font-bold"
                  >
                    Katılım Başvurusunu Gönder
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
          
          {/* Information section */}
          <motion.div
            className="mt-12 bg-black/60 backdrop-blur-sm border border-amber-500 rounded-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-amber-400 mb-4">Neden Katılmalıyım?</h2>
            <div className="space-y-4 text-gray-200">
              <p>
                Cumhuriyetin Halk ile Güncellenme Platformu, Türkiye Cumhuriyeti'nin ikinci yüzyılında, 
                halkın katılımıyla birlikte geleceği şekillendirmeyi amaçlar.
              </p>
              <p>
                Platformumuzda yer alarak:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cumhuriyetin yeni vizyonunun oluşturulmasına katkıda bulunabilirsiniz</li>
                <li>Toplumsal sorunlara çözüm önerilerinizi paylaşabilirsiniz</li>
                <li>Alanınızdaki uzmanlığınızı toplumsal faydaya dönüştürebilirsiniz</li>
                <li>Geleceğin Türkiyesi'nin inşasında söz sahibi olabilirsiniz</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 gap-4">
            <Button 
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-900/20"
              onClick={() => navigate("/turkiye")}
            >
              ◀ Türkiye Sayfasına Dön
            </Button>
            
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              🏠 Ana Sayfa
            </Button>
          </div>
        </div>
      </main>
      
      <AudioControl onToggle={handleToggleAudio} />
    </div>
  );
}