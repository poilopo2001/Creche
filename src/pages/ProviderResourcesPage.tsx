import React from 'react';
import { Book, FileText, Video, Users, Download, Calendar, ExternalLink } from 'lucide-react';

const ProviderResourcesPage: React.FC = () => {
  const resources = [
    {
      title: "Daycare Management Guide",
      description: "A comprehensive guide on effectively managing your daycare business, including tips on organization, staff management, and financial planning.",
      icon: <Book size={24} className="text-indigo-600" />,
      link: "#"
    },
    {
      title: "Safety and Health Checklist",
      description: "Essential safety guidelines and checklists for daycare providers to ensure a safe and healthy environment for children.",
      icon: <FileText size={24} className="text-green-600" />,
      link: "#"
    },
    {
      title: "Educational Activities Library",
      description: "A vast collection of age-appropriate educational activities and lesson plans for children from infants to school-age.",
      icon: <Video size={24} className="text-purple-600" />,
      link: "#"
    },
    {
      title: "Parent Communication Templates",
      description: "Customizable templates for effective communication with parents, including newsletters, incident reports, and progress updates.",
      icon: <Users size={24} className="text-blue-600" />,
      link: "#"
    },
    {
      title: "Licensing and Regulations Guide",
      description: "Up-to-date information on daycare licensing requirements and regulations specific to Luxembourg.",
      icon: <FileText size={24} className="text-red-600" />,
      link: "#"
    },
    {
      title: "Nutrition and Meal Planning Guide",
      description: "Guidelines and resources for planning healthy, balanced meals and snacks for children of all ages.",
      icon: <FileText size={24} className="text-yellow-600" />,
      link: "#"
    }
  ];

  const upcomingWebinars = [
    {
      title: "Effective Behavior Management Strategies",
      date: "May 15, 2023",
      time: "2:00 PM - 3:30 PM",
      description: "Learn proven techniques for managing challenging behaviors in a daycare setting."
    },
    {
      title: "Implementing STEM Activities in Early Childhood Education",
      date: "June 5, 2023",
      time: "1:00 PM - 2:30 PM",
      description: "Discover fun and engaging ways to introduce STEM concepts to young children."
    },
    {
      title: "Creating Inclusive Environments for Children with Special Needs",
      date: "June 20, 2023",
      time: "10:00 AM - 11:30 AM",
      description: "Strategies for adapting your daycare to accommodate children with various special needs."
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Provider Resources</h1>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-12">
            Access valuable resources to help you run your daycare more effectively and provide the best care for children. Our comprehensive collection of guides, templates, and tools is designed to support your success as a daycare provider.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start">
                <div className="mr-4 mt-1">{resource.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <a href={resource.link} className="text-indigo-600 hover:text-indigo-800 flex items-center">
                    <Download size={16} className="mr-1" />
                    Download Resource
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Professional Development</h2>
            <p className="text-gray-600 mb-4">
              Enhance your skills and stay up-to-date with the latest trends in early childhood education through our professional development opportunities.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Online courses on child development, curriculum planning, and leadership</li>
              <li>Workshops on topics such as positive discipline and emergency preparedness</li>
              <li>Annual conference for daycare providers in Luxembourg</li>
            </ul>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              <ExternalLink size={16} className="mr-1" />
              Explore Professional Development Opportunities
            </a>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Webinars</h2>
            <div className="space-y-6">
              {upcomingWebinars.map((webinar, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-2">{webinar.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{webinar.date} | {webinar.time}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{webinar.description}</p>
                  <button className="btn btn-secondary">Register Now</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Need More Support?</h2>
            <p className="text-gray-700 mb-4">
              Our team is here to help you succeed. If you need additional resources, have questions about regulations, or want personalized advice for your daycare, don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="btn btn-primary">Contact Support</a>
              <a href="#" className="btn btn-secondary">Schedule a Consultation</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderResourcesPage;