import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import { 
  Shield, 
  Mail, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  CreditCard,
  Key,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

const loginSchema = z.object({
  identifier: z.string().min(1, "Kullanıcı adı veya e-posta gerekli"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı")
});

const emailLoginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  verificationCode: z.string().min(6, "Doğrulama kodu 6 karakter olmalı").max(6, "Doğrulama kodu 6 karakter olmalı")
});

type LoginFormData = z.infer<typeof loginSchema>;
type EmailLoginFormData = z.infer<typeof emailLoginSchema>;

export default function PremiumLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  });

  const emailForm = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: {
      email: "",
      verificationCode: ""
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await apiRequest("POST", "/api/premium-login", data);
    },
    onSuccess: (response: any) => {
      toast({
        title: "Giriş Başarılı",
        description: "Premium hesabınıza başarıyla giriş yaptınız.",
      });
      // Store token and navigate to dashboard
      localStorage.setItem("premiumToken", response.token);
      navigate("/premium-dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Giriş Hatası", 
        description: error.message || "Kullanıcı adı/şifre hatalı",
        variant: "destructive"
      });
    }
  });

  const emailLoginMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      return await apiRequest("POST", "/api/send-verification", data);
    },
    onSuccess: () => {
      setEmailSent(true);
      toast({
        title: "Doğrulama Kodu Gönderildi",
        description: "E-posta adresinize doğrulama kodu gönderildi.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "E-posta gönderiminde hata oluştu",
        variant: "destructive"
      });
    }
  });

  const verifyEmailMutation = useMutation({
    mutationFn: async (data: EmailLoginFormData) => {
      return await apiRequest("POST", "/api/verify-email-login", data);
    },
    onSuccess: (response: any) => {
      toast({
        title: "Giriş Başarılı",
        description: "E-posta doğrulaması başarılı.",
      });
      localStorage.setItem("premiumToken", response.token);
      navigate("/premium-dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Doğrulama Hatası",
        description: error.message || "Doğrulama kodu hatalı",
        variant: "destructive"
      });
    }
  });

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onEmailSubmit = (data: EmailLoginFormData) => {
    if (!emailSent) {
      emailLoginMutation.mutate({ email: data.email });
    } else {
      verifyEmailMutation.mutate(data);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Dijital Kimlik",
      description: "Benzersiz premium dijital kimlik belgeniz"
    },
    {
      icon: CreditCard,
      title: "Özel İçerik",
      description: "Premium üyelere özel içerik ve materyaller"
    },
    {
      icon: Key,
      title: "Öncelikli Erişim",
      description: "Yeni özelliklere öncelikli erişim hakkı"
    }
  ];

  return (
    <PageLayout 
      showLanguageSelector={true} 
      showBackNavigation={true}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Sol Taraf - Bilgi */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Premium Giriş
                </h1>
                <p className="text-xl text-slate-300">
                  Ücret ödeyerek desteklediğiniz platformumuza premium erişiminizi yapın
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Premium Avantajları</h3>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <feature.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sağ Taraf - Giriş Formu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-4 bg-purple-500/20 rounded-full w-fit">
                    <Shield className="h-8 w-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl text-white">Hesabınıza Giriş Yapın</CardTitle>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="password" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                      <TabsTrigger value="password" className="data-[state=active]:bg-purple-600">
                        Şifre ile Giriş
                      </TabsTrigger>
                      <TabsTrigger value="email" className="data-[state=active]:bg-purple-600">
                        E-posta Doğrulama
                      </TabsTrigger>
                    </TabsList>

                    {/* Şifre ile Giriş */}
                    <TabsContent value="password" className="space-y-4">
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="identifier" className="text-white">
                            Kullanıcı Adı veya E-posta
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="identifier"
                              {...loginForm.register("identifier")}
                              className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                              placeholder="Kullanıcı adınız veya e-posta"
                            />
                          </div>
                          {loginForm.formState.errors.identifier && (
                            <p className="text-sm text-red-400">
                              {loginForm.formState.errors.identifier.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-white">Şifre</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              {...loginForm.register("password")}
                              className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white"
                              placeholder="Şifreniz"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-slate-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          {loginForm.formState.errors.password && (
                            <p className="text-sm text-red-400">
                              {loginForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? "Giriş Yapılıyor..." : "Giriş Yap"}
                        </Button>
                      </form>
                    </TabsContent>

                    {/* E-posta Doğrulama */}
                    <TabsContent value="email" className="space-y-4">
                      <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">E-posta Adresi</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="email"
                              type="email"
                              {...emailForm.register("email")}
                              className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                              placeholder="premium@example.com"
                              disabled={emailSent}
                            />
                          </div>
                          {emailForm.formState.errors.email && (
                            <p className="text-sm text-red-400">
                              {emailForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>

                        {emailSent && (
                          <div className="space-y-2">
                            <Label htmlFor="verificationCode" className="text-white">
                              Doğrulama Kodu
                            </Label>
                            <div className="relative">
                              <Key className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                              <Input
                                id="verificationCode"
                                {...emailForm.register("verificationCode")}
                                className="pl-10 bg-slate-700/50 border-slate-600 text-white tracking-widest"
                                placeholder="123456"
                                maxLength={6}
                              />
                            </div>
                            {emailForm.formState.errors.verificationCode && (
                              <p className="text-sm text-red-400">
                                {emailForm.formState.errors.verificationCode.message}
                              </p>
                            )}
                          </div>
                        )}

                        <Button 
                          type="submit" 
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          disabled={emailLoginMutation.isPending || verifyEmailMutation.isPending}
                        >
                          {!emailSent 
                            ? (emailLoginMutation.isPending ? "Kod Gönderiliyor..." : "Doğrulama Kodu Gönder")
                            : (verifyEmailMutation.isPending ? "Doğrulanıyor..." : "Kodu Doğrula")
                          }
                        </Button>

                        {emailSent && (
                          <div className="flex items-center space-x-2 text-sm text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            <span>Doğrulama kodu e-posta adresinize gönderildi</span>
                          </div>
                        )}
                      </form>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 pt-6 border-t border-slate-700">
                    <p className="text-center text-sm text-slate-400">
                      Premium hesabınız yok mu?{" "}
                      <button 
                        onClick={() => navigate("/katil")}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        Destekçi olun
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}