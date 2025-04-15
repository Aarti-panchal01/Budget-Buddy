
export interface FinancialQuote {
  text: string;
  author: string;
}

export const financialQuotes: FinancialQuote[] = [
  {
    text: "A budget is telling your money where to go instead of wondering where it went.",
    author: "Dave Ramsey"
  },
  {
    text: "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett"
  },
  {
    text: "It's not how much money you make, but how much money you keep.",
    author: "Robert Kiyosaki"
  },
  {
    text: "Beware of little expenses; a small leak will sink a great ship.",
    author: "Benjamin Franklin"
  },
  {
    text: "A penny saved is a penny earned.",
    author: "Benjamin Franklin"
  },
  {
    text: "Money looks better in the bank than on your feet.",
    author: "Sophia Amoruso"
  },
  {
    text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.",
    author: "Dave Ramsey"
  },
  {
    text: "Rich people stay rich by living like they're broke. Broke people stay broke by living like they're rich.",
    author: "Anonymous"
  },
  {
    text: "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought.",
    author: "T.T. Munger"
  },
  {
    text: "Too many people spend money they earned, to buy things they don't want, to impress people that they don't like.",
    author: "Will Rogers"
  },
  {
    text: "Save money and money will save you.",
    author: "Anonymous"
  },
  {
    text: "The art is not in making money, but in keeping it.",
    author: "Anonymous"
  },
  {
    text: "Never spend your money before you have it.",
    author: "Thomas Jefferson"
  },
  {
    text: "Wealth consists not in having great possessions, but in having few wants.",
    author: "Epictetus"
  },
  {
    text: "The more you learn, the more you earn.",
    author: "Warren Buffett"
  }
];

export const getRandomQuote = (): FinancialQuote => {
  const randomIndex = Math.floor(Math.random() * financialQuotes.length);
  return financialQuotes[randomIndex];
};

export const getDailyQuote = (): FinancialQuote => {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const quoteIndex = dayOfYear % financialQuotes.length;
  return financialQuotes[quoteIndex];
};
