import React from 'react';
import './PoliciesSection.css';

const PoliciesSection = () => {
  const policies = [
    {
      id: 1,
      title: "Auto Insurance",
      icon: "🚗",
      description: "Comprehensive coverage for your vehicle with competitive rates and 24/7 roadside assistance.",
      features: ["Collision Coverage", "Liability Protection", "Roadside Assistance", "Rental Car Coverage"],
      startingPrice: "$89/month",
      color: "#3b82f6"
    },
    {
      id: 2,
      title: "Home Insurance",
      icon: "🏠",
      description: "Protect your home and belongings with comprehensive coverage against damage and theft.",
      features: ["Property Damage", "Personal Liability", "Natural Disasters", "Personal Property"],
      startingPrice: "$45/month",
      color: "#10b981"
    },
    {
      id: 3,
      title: "Life Insurance",
      icon: "❤️",
      description: "Secure your family's future with flexible life insurance policies tailored to your needs.",
      features: ["Death Benefit", "Cash Value", "Flexible Premiums", "Family Protection"],
      startingPrice: "$25/month",
      color: "#ef4444"
    },
    {
      id: 4,
      title: "Health Insurance",
      icon: "🏥",
      description: "Comprehensive health coverage with access to a nationwide network of healthcare providers.",
      features: ["Medical Coverage", "Prescription Drugs", "Preventive Care", "Emergency Services"],
      startingPrice: "$120/month",
      color: "#8b5cf6"
    },
    {
      id: 5,
      title: "Business Insurance",
      icon: "💼",
      description: "Protect your business with comprehensive coverage for liability, property, and employee protection.",
      features: ["General Liability", "Property Coverage", "Workers Compensation", "Professional Liability"],
      startingPrice: "$75/month",
      color: "#f59e0b"
    },
    {
      id: 6,
      title: "Travel Insurance",
      icon: "✈️",
      description: "Travel with peace of mind knowing you're covered for unexpected events and emergencies.",
      features: ["Trip Cancellation", "Medical Emergency", "Lost Luggage", "Flight Delays"],
      startingPrice: "$15/trip",
      color: "#06b6d4"
    }
  ];

  return (
    <section id="policies" className="policies-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Insurance Policies</h2>
          <p>Comprehensive coverage solutions designed to protect what matters most to you</p>
        </div>
        
        <div className="policies-grid">
          {policies.map(policy => (
            <div key={policy.id} className="policy-card" style={{'--accent-color': policy.color}}>
              <div className="policy-header">
                <div className="policy-icon">{policy.icon}</div>
                <h3>{policy.title}</h3>
              </div>
              
              <p className="policy-description">{policy.description}</p>
              
              <div className="policy-features">
                <h4>Key Features:</h4>
                <ul>
                  {policy.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="policy-footer">
                <div className="price">
                  <span className="price-label">Starting at</span>
                  <span className="price-amount">{policy.startingPrice}</span>
                </div>
                <button className="get-quote-btn">Get Quote</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="policies-cta">
          <h3>Need Custom Coverage?</h3>
          <p>Our insurance experts are here to help you find the perfect policy for your unique needs.</p>
          <div className="cta-buttons">
            <button className="primary-btn">Speak to an Agent</button>
            <button className="secondary-btn">Compare Policies</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoliciesSection; 