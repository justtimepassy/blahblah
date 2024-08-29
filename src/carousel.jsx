import React, { useState } from 'react';
import Slider from "react-slick";
import Rating from 'react-rating-stars-component';
import Modal from 'react-modal';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselWithDetails = () => {
    const locationName = "Beautiful Beach"; // Example location name
    const [rating, setRating] = useState(0); // Initial rating value
    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
    const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);
    const [carouselImages, setCarouselImages] = useState([
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
    ]);
    const [newReview, setNewReview] = useState("");
    const [newImage, setNewImage] = useState(null);

    const handleRating = (newRating) => {
        setRating(newRating); // Update the rating value
    };

    const handleReviewSubmit = () => {
        console.log("Review Submitted:", newReview);
        // You can add logic to save the review
        setReviewModalIsOpen(false); // Close the modal after submission
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(URL.createObjectURL(file));
        }
    };

    const handlePhotoUpload = () => {
        if (newImage) {
            setCarouselImages([...carouselImages, newImage]);
            setPhotoModalIsOpen(false); // Close the modal after uploading
            setNewImage(null); // Reset the newImage state
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            {/* Carousel */}
            <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
                <Slider {...settings}>
                    {carouselImages.map((image, index) => (
                        <div key={index} className="carousel-item">
                            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Location Name */}
            <h1 className="text-2xl font-bold mt-4 text-center">{locationName}</h1>

            {/* Horizontal Rating Box with Rating Display */}
            <div className="flex justify-center items-center mt-4">
                <Rating 
                    count={5}
                    onChange={handleRating}
                    size={30}
                    activeColor="#ffd700"
                    value={rating}
                    isHalf={true} // Allows for half-star ratings
                />
                <div className="ml-4 text-lg font-bold">
                    {rating.toFixed(1)} / 5
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4 mt-6">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    onClick={() => setReviewModalIsOpen(true)}
                >
                    Review
                </button>
                <button 
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700"
                    onClick={() => setPhotoModalIsOpen(true)}
                >
                    Post Photo
                </button>
            </div>

            {/* Review Modal */}
            <Modal 
                isOpen={reviewModalIsOpen}
                onRequestClose={() => setReviewModalIsOpen(false)}
                contentLabel="Post a Review"
                className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24"
            >
                <h2 className="text-2xl font-bold mb-4">Post a Review</h2>
                <textarea
                    className="w-full h-32 p-2 border border-gray-300 rounded-md"
                    placeholder="Write your review here..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-4">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                        onClick={handleReviewSubmit}
                    >
                        Submit
                    </button>
                </div>
            </Modal>

            {/* Photo Upload Modal */}
            <Modal 
                isOpen={photoModalIsOpen}
                onRequestClose={() => setPhotoModalIsOpen(false)}
                contentLabel="Upload a Photo"
                className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24"
            >
                <h2 className="text-2xl font-bold mb-4">Upload a Photo</h2>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-end mt-4">
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 mr-2"
                        onClick={handlePhotoUpload}
                    >
                        Upload
                    </button>
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700"
                        onClick={() => setPhotoModalIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CarouselWithDetails;
