import React, { Component } from 'react';
import { FaMapMarkerAlt, FaListAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

const features = [
    {
      icon: <FaMapMarkerAlt size={32} className="text-yellow-500" />,
      title: "Integration with Google Maps",
      description: "Get a customized trip on Google Maps to begin your journey quicker and more efficiently."
    },
    {
      icon: <FaListAlt size={32} className="text-yellow-500" />,
      title: "Customizable Checklist",
      description: "Create personalized packing and task lists to ensure nothing is forgotten on your trip."
    },
    {
      icon: <FaCalendarAlt size={32} className="text-yellow-500" />,
      title: "Detailed Itinerary",
      description: "Plan each day of your trip with a comprehensive schedule and activity recommendations."
    },
    {
      icon: <FaClock size={32} className="text-yellow-500" />,
      title: "Flexible Trip Duration",
      description: "Whether it's a weekend getaway or a cross-country journey, plan trips of any length."
    }
  ];

export default class Features extends Component {
    render() {
      return (
        <div className="font-righteous bg-cover bg-center h-screen flex justify-center bg-fixed" 
            style={{ backgroundImage: "url('/assets/images/features-background.jpg')" }}>

            <div className="text-white p-10 sm:p-24 mx-auto">
                <h1 className="text-center text-2xl sm:text-6xl font-bold sm:mb-16">Explore our Features</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-60">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6">
                            <div className="flex items-center gap-8">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-lg sm:text-2xl font-semibold mb-2">{feature.title}</h3>    
                            </div>
                            <p className='text-sm sm:text-lg'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      )
    }
}
