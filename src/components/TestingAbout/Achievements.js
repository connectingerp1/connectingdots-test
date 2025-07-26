"use client";
import React from 'react';
import { Award, Trophy, Star, Target, Zap, Shield, Users, Globe } from 'lucide-react';

const AchievementsSection = () => {
  // Top carousel achievements (10 images)
  const topAchievements = [
    { id: 1, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828097/imgi_91_MjScSi9_bgmnxy.jpg', name: 'Industry Award 2024' },
  { id: 2, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828098/imgi_80_UZSH8He_zl4kz2.jpg', name: 'Best Innovation' },
  { id: 3, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828097/imgi_78_rZohnIF_jku2pz.jpg', name: '5-Star Rating' },
  { id: 4, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828097/imgi_102_UZSH8He_g8wqfc.jpg', name: 'Goal Achievement' },
  { id: 5, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828097/imgi_93_xz6STYH_z1t6x3.jpg', name: 'Performance Excellence' },
  { id: 6, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828096/imgi_98_qhMS713_wveq2g.jpg', name: 'Security Certification' },
  { id: 7, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828097/imgi_112_N9jG1Ir_r2mls8.jpg', name: 'Team Excellence' },
  { id: 8, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828096/imgi_76_qhMS713_lokn1a.jpg', name: 'Global Recognition' },
  { id: 9, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828097/imgi_81_AQjU01z_dcdszf.jpg', name: 'Leadership Award' },
  { id: 10, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828097/imgi_91_MjScSi9_bgmnxy.jpg', name: 'Tech Innovation' },];

  // Bottom carousel achievements (10 different images)
  const bottomAchievements = [
    { id: 11, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828095/imgi_92_0eKfhXd_sbhrc7.jpg', name: 'Data Analytics Award' },
  { id: 12, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828095/imgi_77_KJ5KL2n_gu0pyh.jpg', name: 'Customer Choice' },
  { id: 13, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828095/imgi_88_iNrXB47_bq9oqo.jpg', name: 'Sustainability Medal' },
  { id: 14, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828095/imgi_86_8FfQnL9_hm4gux.jpg', name: 'Business Excellence' },
  { id: 15, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828096/imgi_110_iNrXB47_h2fcho.jpg', name: 'Digital Transformation' },
  { id: 16, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828095/imgi_105_your4dg_jsd4s3.jpg', name: 'Quality Assurance' },
  { id: 17, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828096/imgi_103_AQjU01z_y4yobr.jpg', name: 'Market Leader' },
  { id: 18, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828096/imgi_84_ZN86VMR_yd34r8.jpg', name: 'Innovation Hub' },
  { id: 19, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828096/imgi_85_ADghQbm_pxespn.jpg', name: 'Partnership Award' },
  { id: 20, image: 'https://res.cloudinary.com/dubeuisom/image/upload/v1752828096/imgi_85_ADghQbm_pxespn.jpg', name: 'Excellence Recognition' },
];

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
          {/* Vertical Rectangle Featured Achievement - Left Side (Box 1) */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl lg:rounded-4xl mb-4 lg:mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=320&h=480&fit=crop" 
                  alt="Featured Achievement" 
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex-1 w-full">
            {/* Top Carousel (right to left) */}
            <div className="mb-4 sm:mb-6 lg:mb-8 mt-2 sm:mt-4">
              <div className="relative h-20 sm:h-24 lg:h-32 overflow-hidden">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
                {/* Scrolling container (reverse direction) */}
                <div className="flex items-center animate-scroll-right gap-0">
  {topAchievements.map((achievement) => (
    <div
      key={achievement.id}
      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
    >
      <img 
        src={achievement.image} 
        alt={achievement.name}
        className="min-w-full min-h-full object-cover transform scale-125"
      />
    </div>
  ))}


                  {/* Duplicate set for seamless loop */}
                  {topAchievements.map((achievement) => (
    <div
      key={achievement.id}
      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
    >
      <img 
        src={achievement.image} 
        alt={achievement.name}
        className="min-w-full min-h-full object-cover transform scale-125"
      />
    </div>
  ))}
 </div>
              </div>
            </div>
            
            {/* Heading and Subtitle */}
            <div className="mb-4 sm:mb-6 lg:mb-8 mt-6 sm:mt-8 lg:mt-12 mx-0 sm:mx-8 lg:mx-48">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4 text-left">Our Achievements</h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl text-left">
              Discover our journey through milestones and success stories
              </p>
            </div>
            
            {/* Bottom Carousel (left to right) */}
            <div className="mb-4 sm:mb-6 lg:mb-8 mt-6 sm:mt-8 lg:mt-12">
            <div className="relative h-20 sm:h-24 lg:h-32 overflow-hidden ">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
                
                {/* Scrolling container */}
                <div className="flex animate-scroll-left">
                  {/* First set of achievements */}
                  {bottomAchievements.map((achievement) => (
                    <div
                    key={achievement.id}
                    className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
                  >
                    <img 
                      src={achievement.image} 
                      alt={achievement.name}
                      className="min-w-full min-h-full object-cover transform scale-125"
                    />
                  </div>
                ))}                
                  {/* Duplicate set for seamless loop */}
                  {bottomAchievements.map((achievement) => (
                    <div
                    key={achievement.id}
                    className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
                  >
                    <img 
                      src={achievement.image} 
                      alt={achievement.name}
                      className="min-w-full min-h-full object-cover transform scale-125"
                    />
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AchievementsSection;