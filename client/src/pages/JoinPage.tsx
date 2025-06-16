import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import RealBurningEarthBackground from "@/components/RealBurningEarthBackground";
import TurkishGeneFlowLogo from "@/components/TurkishGeneFlowLogo";
import AudioControl from "@/components/AudioControl";
import LoadingScreen from "@/components/LoadingScreen";
import { apiRequest } from "@/lib/queryClient";

export default function JoinPage() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  
  const interestOptions = [
    { id: "social", label: "Sosyal Adalet" },
    { id: "environment", label: "Çevre" },
    { id: "technology", label: "Teknoloji" },
    { id: "education", label: "Eğitim" },
    { id: "culture", label: "Kültür ve Sanat" },
    { id: "economy", label: "Ekonomi" }
  ];
  
  useEffect(() => {
    // Record page visit
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: true
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
  }, [i18n.language]);

  const handleToggleAudio = () => {
  };
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  const handleInterestChange = (interest: string) => {
    setInterests(
      interests.includes(interest)
        ? interests.filter(i => i !== interest)
        : [...interests, interest]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: t('join.error'),
        description: t('join.error_message'),
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send this to the server
      // For now just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await apiRequest(
        "POST", 
        "/api/feedback", 
        {
          content: `${name} (${email}): ${message} - Interests: ${interests.join(', ')}`,
          rating: 5,
          language: i18n.language || "tr"
        }
      );
      
      // Show success toast
      toast({
        title: t('join.success'),
        description: t('join.success_message')
      });
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setInterests([]);
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast({
        title: t('join.error'),
        description: t('join.error_message'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className="min-h-screen flex flex-col items-center justify-center text-matrix-green overflow-hidden">
        <RealBurningEarthBackground />
        
        <main className="container mx-auto px-4 z-10 relative py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <Link href="/">
              <motion.div
                className="flex items-center cursor-pointer mb-6 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 mr-4">
                  <TurkishGeneFlowLogo />
                </div>
                <h2 className="text-2xl font-share-tech text-green-400">
                  {t('simay_title')}
                </h2>
              </motion.div>
            </Link>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Button 
                asChild
                className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
              >
                <Link href="/manifesto">
                  {t('simay_manifesto_button')}
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Join Form */}
          <div className="bg-black/60 backdrop-blur-sm border border-green-600 rounded-xl p-6 md:p-10 max-w-2xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-4xl font-share-tech text-center mb-3 text-green-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t('join.title')}
            </motion.h1>
            
            <motion.p
              className="text-lg font-roboto-mono text-center mb-8 text-amber-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t('join.subtitle')}
            </motion.p>
            
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="space-y-3">
                <Label htmlFor="name" className="text-white">
                  {t('join.name')}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/70 border-green-600 text-white focus:border-green-400"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white">
                  {t('join.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/70 border-green-600 text-white focus:border-green-400"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-white">
                  {t('join.interests')}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id}
                        checked={interests.includes(option.id)}
                        onCheckedChange={() => handleInterestChange(option.id)}
                        className="border-green-600 data-[state=checked]:bg-green-600"
                      />
                      <Label 
                        htmlFor={option.id}
                        className="text-white cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="message" className="text-white">
                  {t('join.message')}
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-black/70 border-green-600 text-white focus:border-green-400 min-h-[100px]"
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg"
              >
                {isSubmitting ? t('join.submitting') : t('join.submit')}
              </Button>
            </motion.form>
          </div>
          
          {/* Bottom Navigation */}
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Button 
              asChild
              className="bg-transparent border border-green-500 hover:bg-green-900/50 text-green-400 font-bold rounded-lg mx-2"
            >
              <Link href="/">
                {t('back_to_home')}
              </Link>
            </Button>
          </motion.div>
        </main>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    </>
  );
}