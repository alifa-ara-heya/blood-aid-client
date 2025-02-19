
import quoteImg from '../../assets/quote.png'

// import { Rating } from 'react-simple-star-rating'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import './reviewStyles.css'

import { useEffect, useState } from "react";
import Heading from '../Shared/Heading';
import StarRatings from 'react-star-ratings';


const Reviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`reviews.json`)
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })

    }, [])

    // console.log(reviews);
    return (
        <section className="md:my-20 my-10 max-w-[1920px] mx-auto">
            <Heading title={'Reviews'} subtitle={'What people say about us'} />
            {/*  <div className="flex items-center justify-center">
                <FaStar size={30} color="#CD9003" />
                <FaStar size={30} color="#CD9003" />
                <FaStar size={30} color="#CD9003" />
                <FaStar size={30} color="#CD9003" />
                <FaStar size={30} />
            </div> */}


            <Swiper navigation={true} modules={[Navigation]} className="mySwiper max-w-[1320px] w-11/12 mx-auto text-center">

                {reviews.map(review => <SwiperSlide key={review._id} >

                    {/*      <ReactStars
                            count={5}
                            value={review.rating}
                            size={30}
                            isHalf={true}
                            activeColor="#CD9003"
                            edit={false}

                        /> */}

                    {/* <Rating
                            readonly
                            // initialValue={review.rating}
                            initialValue={3.5}
                            size={20}
                            allowFraction={true}
                            className='mx-auto'
                        /> */}
                    <div className='mt-10'>
                        <StarRatings
                            rating={review.rating}
                            starDimension="25px"
                            starSpacing="15px"
                            starRatedColor='#CD9003'
                        />
                    </div>



                    <img src={quoteImg} alt="" className="mx-auto my-9 mb-12" />
                    <p className="w-3/4 mx-auto">{review.details}</p>
                    <h5 className="text-[#CD9003] font-medium md:text-3xl text-xl py-6">{review.name}</h5>
                </SwiperSlide>)}

            </Swiper>
        </section>
    );
};

export default Reviews;