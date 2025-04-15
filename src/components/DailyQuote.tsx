
import { getDailyQuote } from '@/utils/quotes';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export function DailyQuote() {
  const quote = getDailyQuote();
  
  return (
    <Card className="bg-budget-blue-light border-budget-blue shadow-sm hover:shadow transition-all duration-300">
      <CardContent className="pt-6 pb-4 px-4">
        <div className="flex items-start gap-2">
          <Quote className="text-budget-blue-dark shrink-0 mt-1" />
          <div>
            <p className="text-gray-700 italic">{quote.text}</p>
            <p className="text-right text-sm text-gray-500 mt-2">— {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
