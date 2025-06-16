import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type FeedbackFormProps = {
  onSubmit?: () => void;
};

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const { t, i18n } = useTranslation();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast({
        title: t('feedback.error'),
        description: t('feedback.empty_error'),
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest(
        "POST", 
        "/api/feedback", 
        {
          content: feedback,
          rating: rating,
          language: i18n.language || "tr"
        }
      );
      
      toast({
        title: t('feedback.success'),
        description: t('feedback.thank_you'),
      });
      
      setFeedback("");
      if (onSubmit) onSubmit();
    } catch (error) {
      // Silent feedback submission error
      toast({
        title: t('feedback.error'),
        description: t('feedback.submit_error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-md w-full bg-black/50 backdrop-blur-sm border border-matrix-green rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-share-tech mb-4">{t('feedback.title')}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t('feedback.placeholder')}
            className="h-32 bg-deep-black border-matrix-green text-matrix-green focus:border-matrix-green focus:ring-matrix-green"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-roboto-mono mb-2">
            {t('feedback.rating')}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                variant={rating === value ? "default" : "outline"}
                className={`w-10 h-10 p-0 ${
                  rating === value 
                    ? "bg-matrix-green text-deep-black" 
                    : "bg-transparent border-matrix-green text-matrix-green"
                }`}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-matrix-green text-deep-black hover:bg-matrix-green/90 font-roboto-mono"
        >
          {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
        </Button>
      </form>
    </motion.div>
  );
}