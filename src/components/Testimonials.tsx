import React, { Component } from 'react'

const testimonials = [
    {
        message:`"I love Ranger! This app saves me so much time and money when I'm on the road."`,
        name: 'Jane Doe',
        date: 'August 3rd 2024'
    },
    {
        message:`"Amazing app! 10/10 recommend to anyone looking to spice up their travels."`,
        name: 'John Smith',
        date: 'August 3rd 2024'
    },
    {
        message:`"I used to dread road trips because of all the planning and budgeting. Now, with Ranger, I don't have to worry!"`,
        name: 'Joe Shmoe',
        date: 'August 3rd 2024'
    }
]

export default class Testimonials extends Component {
    render() {
        return (
        <div className="font-righteous bg-cover bg-center flex justify-center bg-fixed h-screen" 
            style={{ backgroundImage: "url('/assets/images/testimonials-background.jpg')" }}>

            <div className="text-white p-24">
                <h1 className="text-center text-6xl font-bold mb-24 sm:mb-16">Testimonials</h1>

                <div className="text-center">
                {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-6">
                            <h1>{testimonial.message}</h1>
                            <p>{`-${testimonial.name}, ${testimonial.date}`}</p>
                        </div>
                    ))}
                </div>

                {/* Carousel with testimonials here */}
                {/* <div className="">
                    {testimonials.map((testimonal, index) => (
                        <div key={index} className="p-6">
                            
                        </div>
                    ))}
                </div> */}
            </div>

        </div>
      )
    }
}
