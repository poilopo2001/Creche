import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "How do I find a daycare on DayCareConnect?",
      answer: "To find a daycare, use our search feature on the homepage. Enter your location and any specific requirements you have. You can filter results by age group, rating, and other criteria to find the perfect match for your child."
    },
    {
      question: "Are all daycares on DayCareConnect licensed?",
      answer: "Yes, we verify that all daycares listed on our platform are licensed and comply with local regulations. However, we always encourage parents to double-check licensing information and visit the daycare in person before making a decision."
    },
    {
      question: "How do I schedule a tour of a daycare?",
      answer: "You can request a tour directly through the daycare's profile page on our website. Click the 'Request a Tour' button, and you'll be able to select available dates and times. The daycare will then confirm your tour request."
    },
    {
      question: "What should I look for when choosing a daycare?",
      answer: "Important factors to consider include the staff-to-child ratio, cleanliness, safety measures, educational programs, and the overall environment. We recommend reading reviews from other parents, checking the daycare's policies, and visiting in person before making a decision."
    },
    {
      question: "How can I leave a review for a daycare?",
      answer: "After your child has attended a daycare found through our platform, you'll receive an invitation to leave a review. You can rate various aspects of the daycare and share your experience to help other parents make informed decisions."
    },
    {
      question: "What if I have a complaint about a daycare?",
      answer: "If you have concerns about a daycare listed on our platform, please contact us immediately through our support channel. We take all complaints seriously and will investigate the issue while maintaining your privacy."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-left">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-indigo-600" size={24} />
                ) : (
                  <ChevronDown className="text-indigo-600" size={24} />
                )}
              </button>
              {openIndex === index && (
                <div className="bg-white p-6 rounded-b-lg shadow-md mt-1">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xl mb-4">Didn't find the answer you were looking for?</p>
          <button className="btn btn-primary">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;