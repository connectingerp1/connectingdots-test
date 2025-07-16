"use client";
import React, { useEffect, useState } from "react";

const ProgressBars = () => {
  const [isVisible, setIsVisible] = useState(false);

  const courses = [
    { name: "SAP FICO", percentage: 98, icon: "💼", description: "Financial Accounting & Controlling" },
    { name: "SAP MM", percentage: 95, icon: "🛒", description: "Materials Management" },
    { name: "SAP SD", percentage: 93, icon: "🚚", description: "Sales & Distribution" },
    { name: "SAP ABAP", percentage: 90, icon: "💻", description: "Development & Programming" },
    { name: "SAP HCM", percentage: 88, icon: "👥", description: "Human Capital Management" },
    { name: "SAP Basis", percentage: 85, icon: "🔧", description: "System Administration" },
    { name: "SAP S/4 HANA", percentage: 92, icon: "📊", description: "Next-Gen ERP Suite" },
  ];

  const industryData = [
    { name: "Manufacturing", adoption: 90 },
    { name: "IT & Consulting", adoption: 95 },
    { name: "Retail & FMCG", adoption: 75 },
    { name: "Banking & Finance", adoption: 80 },
    { name: "Healthcare", adoption: 70 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const progressSection = document.querySelector('.progress-container');
    if (progressSection) {
      observer.observe(progressSection);
    }

    return () => {
      if (progressSection) {
        observer.unobserve(progressSection);
      }
    };
  }, []);

  return (
    <div className="progress-container py-16 px-8 bg-gray-50 text-gray-800 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#01021d] mb-4 relative inline-block">
            SAP Ecosystem Expertise
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#462ded] to-[#f2a624] rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our comprehensive curriculum covers the entire SAP landscape, with specialized focus on high-demand modules
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          {/* Left Side: SAP Module Progress Bars */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-l-4 border-[#f2a624] pl-4">
              SAP Module Placement Success Rate
            </h2>

            {courses.map((course, index) => (
              <div
                className={`mb-6 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                }`}
                key={index}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#462ded] to-[#6246ea] rounded-full flex items-center justify-center mr-4 text-lg shadow-lg shadow-[#462ded]/30">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-lg">{course.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{course.description}</div>
                    </div>
                  </div>
                  <div className="font-bold text-[#f2a624] text-xl min-w-12 text-right">
                    {isVisible ? course.percentage : 0}%
                  </div>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#462ded] to-[#f2a624] rounded-full transition-all duration-1000 ease-in-out relative"
                    style={{
                      width: isVisible ? `${course.percentage}%` : '0%',
                    }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-2.5 bg-[#f2a624] rounded-r-full"></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-around mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#462ded] mb-2">2500+</div>
                <div className="text-sm text-gray-600 font-medium">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#462ded] mb-2">95%</div>
                <div className="text-sm text-gray-600 font-medium">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#462ded] mb-2">100+</div>
                <div className="text-sm text-gray-600 font-medium">Corporate Partners</div>
              </div>
            </div>
          </div>

          {/* Right Side: Description and Industry Adoption */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <h2 className="text-3xl font-bold text-[#01021d] mb-6 relative pb-4">
                SAP Skills in High Demand
                <span className="absolute bottom-0 left-0 w-15 h-1 bg-gradient-to-r from-[#f2a624] to-[#462ded] rounded-full"></span>
              </h2>
              
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-6">
                  The SAP ecosystem continues to dominate the ERP market, with over
                  400,000 customers worldwide and a growing demand for skilled professionals.
                  At Connecting Dots ERP, we focus on high-demand SAP modules that offer
                  excellent career growth potential.
                </p>
                <p className="mb-6">
                  Our training programs are continuously updated to align with the latest
                  SAP innovations, including S/4HANA, SAP Cloud Platform, and industry-specific
                  solutions. With over 10 years of experience in SAP training, we've developed
                  partnerships with leading implementation companies to ensure our curriculum
                  meets current industry needs.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
                  SAP Adoption by Industry
                </h3>
                
                <div className="mb-8">
                  {industryData.map((industry, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{industry.name}</span>
                        <span className="text-sm font-semibold text-[#f2a624]">{industry.adoption}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-[#f2a624] to-[#462ded] rounded-full transition-all duration-1000 ease-in-out"
                          style={{
                            width: isVisible ? `${industry.adoption}%` : '0%',
                            transitionDelay: `${0.5 + index * 0.2}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="bg-[#462ded] text-white px-6 py-3 rounded font-semibold shadow-lg shadow-[#462ded]/30 hover:bg-[#f2a624] hover:shadow-[#f2a624]/40 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer border-none">
                    Explore SAP Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBars;