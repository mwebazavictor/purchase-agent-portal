import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "TAI Agent Suite has transformed how we handle customer support. Our response time has decreased by 70% while maintaining high customer satisfaction.",
      author: "Sarah Johnson",
      role: "Customer Support Director",
      company: "TechCorp Inc.",
      image: "/testimonials/sarah.jpg",
      rating: 5,
    },
    {
      quote: "The implementation process was seamless, and the results were immediate. Our team now focuses on strategic tasks while our AI agent handles routine inquiries.",
      author: "Michael Chen",
      role: "Operations Manager",
      company: "Global Solutions",
      image: "/testimonials/michael.jpg",
      rating: 5,
    },
    {
      quote: "The ability to train the agent with our specific knowledge base has made it an invaluable part of our customer service team.",
      author: "Emma Rodriguez",
      role: "Product Manager",
      company: "InnovateTech",
      image: "/testimonials/emma.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tech-gradient-text">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of businesses that have transformed their operations with TAI Agent Suite.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-6 rounded-xl">
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
