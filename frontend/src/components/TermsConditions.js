import React, { useState } from 'react';
import './TermsConditions.css';

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    {
      id: 'general',
      title: 'General Terms',
      content: [
        {
          subtitle: 'Acceptance of Terms',
          text: 'By accessing and using InsureBot services, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          subtitle: 'Service Description',
          text: 'InsureBot provides insurance services including policy management, claims processing, and customer support through our digital platform.'
        },
        {
          subtitle: 'User Eligibility',
          text: 'You must be at least 18 years old and have the legal capacity to enter into binding agreements to use our services.'
        }
      ]
    },
    {
      id: 'policies',
      title: 'Insurance Policies',
      content: [
        {
          subtitle: 'Policy Coverage',
          text: 'All insurance policies are subject to the terms, conditions, and exclusions outlined in the specific policy documents provided to you.'
        },
        {
          subtitle: 'Premium Payments',
          text: 'Premiums must be paid in full and on time to maintain active coverage. Late payments may result in policy cancellation.'
        },
        {
          subtitle: 'Policy Modifications',
          text: 'Changes to your policy must be requested in writing and are subject to approval and potential premium adjustments.'
        }
      ]
    },
    {
      id: 'claims',
      title: 'Claims Process',
      content: [
        {
          subtitle: 'Claims Filing',
          text: 'Claims must be reported promptly, typically within 24-48 hours of the incident, depending on the type of coverage.'
        },
        {
          subtitle: 'Documentation Required',
          text: 'All claims require appropriate documentation including police reports, medical records, or repair estimates as applicable.'
        },
        {
          subtitle: 'Claims Investigation',
          text: 'We reserve the right to investigate all claims thoroughly, which may include interviews, inspections, and third-party verification.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      content: [
        {
          subtitle: 'Information Collection',
          text: 'We collect personal information necessary to provide insurance services, including contact details, financial information, and claims history.'
        },
        {
          subtitle: 'Data Protection',
          text: 'Your personal information is protected using industry-standard security measures and is only used for legitimate business purposes.'
        },
        {
          subtitle: 'Information Sharing',
          text: 'We may share your information with third parties only as necessary for claims processing, legal compliance, or with your explicit consent.'
        }
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      content: [
        {
          subtitle: 'Service Availability',
          text: 'While we strive for 24/7 service availability, we are not liable for temporary service interruptions due to maintenance or technical issues.'
        },
        {
          subtitle: 'Information Accuracy',
          text: 'We provide information to the best of our ability but cannot guarantee the accuracy of all third-party information or external links.'
        },
        {
          subtitle: 'Maximum Liability',
          text: 'Our liability is limited to the amount of premiums paid in the 12 months preceding any claim, except where prohibited by law.'
        }
      ]
    }
  ];

  return (
    <section id="terms" className="terms-section">
      <div className="container">
        <div className="section-header">
          <h2>Terms & Conditions</h2>
          <p>Please read these terms carefully before using our services</p>
        </div>
        
        <div className="terms-content">
          <div className="terms-sidebar">
            <nav className="terms-nav">
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="terms-main">
            {sections.map(section => (
              <div
                key={section.id}
                className={`terms-panel ${activeSection === section.id ? 'active' : ''}`}
              >
                <h3>{section.title}</h3>
                <div className="terms-content-list">
                  {section.content.map((item, index) => (
                    <div key={index} className="terms-item">
                      <h4>{item.subtitle}</h4>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="terms-footer">
          <div className="legal-notice">
            <h4>Legal Notice</h4>
            <p>
              These terms and conditions constitute a legally binding agreement between you and InsureBot. 
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. 
              If you do not agree with any part of these terms, please do not use our services.
            </p>
            <p>
              <strong>Last Updated:</strong> January 2024<br/>
              <strong>Version:</strong> 2.1
            </p>
          </div>
          
          <div className="contact-legal">
            <h4>Questions About These Terms?</h4>
            <p>If you have any questions about these terms and conditions, please contact our legal department:</p>
            <div className="contact-info">
              <span>📧 legal@insurebot.com</span>
              <span>📞 1-800-INSURANCE (ext. 9)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions; 