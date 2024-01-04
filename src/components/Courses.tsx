'use client'
import { getCourses } from '@/helpers/getCourses';
import React, { useEffect, useState } from 'react'
import Product from './Product';

function Courses() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesList = await getCourses();
                setCourses(coursesList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (typeof window !== "undefined") {
            // Run the effect only in the browser environment
            fetchCourses();
        }
    }, []);


    return (
        <Product prefix='cr' products={courses} />
        )
}

export default Courses