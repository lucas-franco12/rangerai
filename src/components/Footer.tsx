import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Ranger</h3>
            </div>
            <div className="flex space-x-6">
              <a href="#home" className="hover:text-gray-400">
                Home
              </a>
              <a href="#features" className="hover:text-gray-400">
                Features
              </a>
              <a href="#testimonials" className="hover:text-gray-400">
                Testimonials
              </a>
              <a href="#contact" className="hover:text-gray-400">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            &copy; 2024 Ranger. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }
}
