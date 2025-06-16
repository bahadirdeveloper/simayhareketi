import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModernLayout from "@/components/ModernLayout";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Server, 
  GraduationCap, 
  Shield,
  Users,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  verified: boolean;
}

interface FinancialStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  lastUpdate: string;
}

export default function CanliGelirGiderPage() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'month' | 'week'>('month');

  // Fetch financial data
  const { data: stats, isLoading: statsLoading } = useQuery<FinancialStats>({
    queryKey: ['/api/financial-stats'],
    refetchInterval: 30000, // Refresh every 30 seconds for live data
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ['/api/transactions', selectedPeriod],
    refetchInterval: 30000, // Refresh every 30 seconds for live data
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ModernLayout 
      audioKey="financial" 
      showBackButton={true}
      pageContent="Platformun mali şeffaflığı için gerçek zamanlı gelir-gider takip sistemi."
      pageName="Canlı Gelir-Gider Tablosu"
    >
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-900 via-gray-900 to-emerald-900 border border-emerald-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-wider drop-shadow-2xl">
              MALİ ŞEFFAFLIK
            </h1>
            <p className="text-xl text-emerald-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Platformumuzun tüm gelir ve giderlerinin canlı, şeffaf ve doğrulanabilir takibi
            </p>
            
            {stats && (
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-8 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="w-16 h-1 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-8 h-1 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
              </div>
            )}
            
            <div className="text-sm text-emerald-300">
              Son Güncelleme: {stats ? formatDate(stats.lastUpdate) : 'Yükleniyor...'}
            </div>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Income */}
          <div className="bg-gradient-to-br from-green-800 to-green-900 border border-green-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <ArrowUpCircle className="h-8 w-8 text-green-400" />
            </div>
            <div className="mb-4">
              <h3 className="text-green-200 text-sm font-medium mb-2">TOPLAM GELİR</h3>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? 'Yükleniyor...' : formatCurrency(stats?.totalIncome || 0)}
              </div>
            </div>
            <div className="flex items-center text-green-300 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Toplam bağış miktarı</span>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-gradient-to-br from-red-800 to-red-900 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <ArrowDownCircle className="h-8 w-8 text-red-400" />
            </div>
            <div className="mb-4">
              <h3 className="text-red-200 text-sm font-medium mb-2">TOPLAM GİDER</h3>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? 'Yükleniyor...' : formatCurrency(stats?.totalExpenses || 0)}
              </div>
            </div>
            <div className="flex items-center text-red-300 text-sm">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>Toplam harcama</span>
            </div>
          </div>

          {/* Current Balance */}
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mb-4">
              <h3 className="text-blue-200 text-sm font-medium mb-2">MEVCUT BAKİYE</h3>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? 'Yükleniyor...' : formatCurrency(stats?.balance || 0)}
              </div>
            </div>
            <div className="flex items-center text-blue-300 text-sm">
              <Shield className="h-4 w-4 mr-1" />
              <span>Kullanılabilir tutar</span>
            </div>
          </div>

          {/* Monthly Stats */}
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
            <div className="mb-4">
              <h3 className="text-purple-200 text-sm font-medium mb-2">AYLIK NET</h3>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? 'Yükleniyor...' : formatCurrency((stats?.monthlyIncome || 0) - (stats?.monthlyExpenses || 0))}
              </div>
            </div>
            <div className="flex items-center text-purple-300 text-sm">
              <Users className="h-4 w-4 mr-1" />
              <span>Bu ay net durum</span>
            </div>
          </div>
        </div>

        {/* Period Selection */}
        <div className="flex justify-center">
          <div className="bg-gray-800 border border-gray-600 rounded-xl p-2 flex gap-2">
            {[
              { key: 'week', label: 'Bu Hafta' },
              { key: 'month', label: 'Bu Ay' },
              { key: 'all', label: 'Tümü' }
            ].map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedPeriod === period.key
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-900 border border-gray-600 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">İşlem Geçmişi</h2>
            <p className="text-gray-400">Tüm gelir ve giderlerin detaylı listesi</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">TİP</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">AÇIKLAMA</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">KATEGORİ</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">TUTAR</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">TARİH</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">DURUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactionsLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      İşlemler yükleniyor...
                    </td>
                  </tr>
                ) : transactions && transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 ${
                          transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpCircle className="h-5 w-5" />
                          ) : (
                            <ArrowDownCircle className="h-5 w-5" />
                          )}
                          <span className="font-medium">
                            {transaction.type === 'income' ? 'GELİR' : 'GİDER'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white">{transaction.description}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                          {transaction.category}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-bold ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {transaction.verified ? (
                          <span className="px-2 py-1 bg-green-900 text-green-300 rounded-full text-xs">
                            Doğrulandı
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded-full text-xs">
                            Beklemede
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      Bu dönemde işlem bulunmuyor
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Server Costs */}
          <div className="bg-gradient-to-br from-orange-800 to-orange-900 border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Server className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">SUNUCU GİDERLERİ</h3>
                <p className="text-orange-200 text-sm">Hosting ve altyapı</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {formatCurrency(2850)} <span className="text-sm font-normal">/ay</span>
            </div>
            <div className="text-orange-200 text-sm">
              Replit, domain, SSL sertifikaları
            </div>
          </div>

          {/* Education Costs */}
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">EĞİTİM GİDERLERİ</h3>
                <p className="text-blue-200 text-sm">İçerik ve materyal</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {formatCurrency(1200)} <span className="text-sm font-normal">/ay</span>
            </div>
            <div className="text-blue-200 text-sm">
              Görsel tasarım, ses düzenleme
            </div>
          </div>

          {/* Security Costs */}
          <div className="bg-gradient-to-br from-purple-800 to-purple-900 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">GÜVENLİK GİDERLERİ</h3>
                <p className="text-purple-200 text-sm">Veri korunması</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {formatCurrency(850)} <span className="text-sm font-normal">/ay</span>
            </div>
            <div className="text-purple-200 text-sm">
              Backup, güvenlik araçları
            </div>
          </div>
        </div>

        {/* Transparency Note */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Şeffaflık Taahhüdümüz</h3>
          <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Platformumuzun her bir kuruşu halkın güveni ile yönetilmektedir. 
            Tüm gelir ve giderler gerçek zamanlı olarak bu sayfada yayınlanır. 
            Her işlem doğrulanabilir ve hesap verilebilir şekilde kayıt altına alınır.
            Hiçbir ticari faaliyet yapılmamakta, sadece eğitim ve kültürel hizmetler için bağış kabul edilmektedir.
          </p>
        </div>

      </div>
    </ModernLayout>
  );
}