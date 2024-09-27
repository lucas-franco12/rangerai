import React, { Component } from 'react'
import Navbar from './Navbar'

export default class Hero extends Component {
    render() {
        return (
        <div className="font-righteous bg-cover bg-center min-h-screen flex flex-col items-center justify-center bg-fixed flex-grow" 
            style={{ backgroundImage: "url('/assets/images/hero-background.jpg')" }}>
            <Navbar />
            <div className="p-10 text-center text-white">
                <h1 className="text-8xl font-bold md:mb-32 ">
                    <span className="block">Plan your next</span>
                    <span className="block">trip with <span className="text-green-800">Ranger.</span></span>
                </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        placeholder="Location"
                        className="p-3 w-full md:w-1/3 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Destination"
                        className="p-3 w-full md:w-1/3 rounded-md"
                    />
                    </div>
                    <button className="mt-6 p-3 bg-black text-white rounded-md hover:bg-green-800 transition duration-300">Let's Get Started</button>
                </div>
        </div>
        )  
    }
}
