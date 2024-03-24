'use client'
import React, { useEffect, useState } from 'react'
import Product from './Product';
import CourseCard from './CourseCard';
import supabase from '@/supabase/config';

function Courses() {
    const [courses, setCourses] = useState<any[]>([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await supabase.from('courses').select();
                setCourses(data! || []);
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
        <CourseCard categoryName="courses" products={courses} />
    )
}

export default Courses
