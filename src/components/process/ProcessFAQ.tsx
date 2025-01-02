import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQSection {
  title: string;
  questions: FAQItem[];
  accentColor: string;
}

export const ProcessFAQ = () => {
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: string]: boolean}>({});

  const toggleQuestion = (sectionTitle: string, questionIndex: number) => {
    const key = `${sectionTitle}-${questionIndex}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqSections: FAQSection[] = [
    {
      title: 'Site Visit',
      accentColor: 'border-[#76B82A]',
      questions: [
        {
          question: 'When do I have to provide the completed Site Visit Checklist?',
          answer: 'The Site Visit Checklist will need to be completed in order to progress into the Design Coordination phase. The information provided in the Checklist is required to efficiently work through your design and set your project up for success!'
        }
      ]
    },
    {
      title: 'Design Coordination',
      accentColor: 'border-[#76B82A]',
      questions: [
        {
          question: 'Does my project need to comply with energy code?',
          answer: [
            "Chances are, yes. Any building that uses heating or cooling (conditioned) needs to comply with energy code. Further, any building that is considered 'habitable' is required to be conditioned.",
            'CALIFORNIA: Additional material or equipment upgrades may be required outside of Studio Shed kit. Solar panels are required for all new conditioned residential buildings in CA.'
          ]
        },
        {
          question: 'Do I need a survey?',
          answer: 'Our permit plan set includes a general site plan based on GIS and Public data. Customer is responsible for verifying accuracy and providing a Survey or ILC if required by local jurisdiction.'
        }
      ]
    },
    {
      title: 'Project Design',
      accentColor: 'border-[#FFB800]',
      questions: [
        {
          question: 'Do I need a soils report?',
          answer: [
            "Building code allows us to make some assumptions, but ultimately the building official is allowed to request a soils report. If you are unsure, we recommend reaching out to the building department to determine if they'll require one for your project.",
            "If any foundations on your site are showing signs of settling, or if you've needed to provide them in past, we recommend pursuing a soils report for your Studio Shed."
          ]
        }
      ]
    },
    {
      title: 'Permitting',
      accentColor: 'border-[#006D77]',
      questions: [
        {
          question: 'Does the plan set include permit fees?',
          answer: 'No, Permit fees are the responsibility of the customer.'
        }
      ]
    },
    {
      title: 'Scope Call & Production',
      accentColor: 'border-[#00A5E5]',
      questions: [
        {
          question: 'How long does production take?',
          answer: 'Current material lead times are the largest factor in the production timeline. We are generally able to build and ship units with just a few weeks of permit approval, but site work and special materials can occasionally cause delays.'
        },
        {
          question: 'Is this my only opportunity to ask questions during the project?',
          answer: 'No, your Project Manager will be available all the way through completion of the unit to answer questions you or your contractor may have. Your Project Manager will also be your main point of contact if you have questions once the Studio Shed is complete.'
        },
        {
          question: 'Can I get away with making alterations after permit approval?',
          answer: 'It is unlikely, but feel free to ask your Project Manager. Most modifications will require another round of revisions with the city, additional design fees, and more time until you can build.'
        },
        {
          question: 'Is a scope call necessary?',
          answer: 'While we do not require you to take the call, we highly recommend you do so we may cover the necessary items to make your project go smoothly.'
        },
        {
          question: 'Can I change my color choices after my shed is in production?',
          answer: 'No. Your color choices are locked in once you sign the Coordination Set and Contract. As each building is fabricated individually, last minute changes derail the production, shipping, and installation schedules.'
        }
      ]
    },
    {
      title: 'Installation',
      accentColor: 'border-[#6B46C1]',
      questions: [
        {
          question: 'Does my unit include HVAC?',
          answer: 'Only if a Studio Shed BATHROOM kit is purchased. Otherwise, this can be quoted by your contractor directly.'
        },
        {
          question: 'How is my building anchored to the foundation?',
          answer: 'Depending on the foundation type (concrete or wood), you will use concrete anchor bolts or structural wood screws provided by Studio Shed.'
        },
        {
          question: 'How long does installation take?',
          answer: 'By building individual components in our factory, we are able drastically reduce on-site construction time as compared to typical construction. Installation timelines vary greatly by region and project scope. A 10x12 shell-only installation can take as little as two working days, while a full ADU can take several weeks. Inspection timelines can also vary greatly by building department. Your timeline will be discussed more specifically in your scope call.'
        },
        {
          question: 'When does my foundation need to be completed?',
          answer: 'Ideally, by the time your unit is being delivered your foundation should be fully built, cured, and evaluated for proper conditions (ie: square, level, at least 8" above grade). If inspections are required these should be completed prior to delivery as well.'
        },
        {
          question: 'Who is responsible for my inspections?',
          answer: 'If DIY, you or your contractor should decide how these will be handled with the AHJ (authority having jurisdiction). If DIFM, your Studio Shed Network Contractor will schedule and be present (if necessary) for all inspections.'
        },
        {
          question: 'What do I do if my shipment is damaged when it arrives?',
          answer: 'Contact your Project Manager immediately. They will ask you to provide photos and description of the damages (photographs need to be of material still on the truck if it arrived damaged on the truck). Your PM will determine the best course of action for repairing or replacing the damaged materials. It is critical that you inspect the materials for damages as soon as possible to allow SS to properly assess how to move forward and minimize construction delays.'
        },
        {
          question: "What do I do if I need to store my building kit on site before it's installed?",
          answer: 'Contact your Project Manager for guidance on how to properly store materials on-site. Please note that an unbuilt Studio Shed kit is not designed to withstand the elements for long periods of time if not properly protected.'
        }
      ]
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="space-y-8">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={`border-t-4 ${section.accentColor} bg-white shadow-lg rounded-lg overflow-hidden`}>
              <h3 className="font-bold text-lg px-6 py-4 uppercase">{section.title}</h3>
              <div className="divide-y divide-gray-200">
                {section.questions.map((item, questionIndex) => {
                  const key = `${section.title}-${questionIndex}`;
                  const isExpanded = expandedQuestions[key];

                  return (
                    <div key={questionIndex} className="border-t border-gray-200 first:border-t-0">
                      <button
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50"
                        onClick={() => toggleQuestion(section.title, questionIndex)}
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6">
                          {Array.isArray(item.answer) ? (
                            item.answer.map((paragraph, i) => (
                              <p key={i} className="text-gray-600 mb-4 last:mb-0">{paragraph}</p>
                            ))
                          ) : (
                            <p className="text-gray-600">{item.answer}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};