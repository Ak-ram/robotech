'use client'
import React, { useEffect, useState } from 'react'
import Product from './Product';
import CourseCard from './CourseCard';
import supabase from '@/supabase/config';
import Loading from './Loading';
import { Loader } from 'lucide-react';

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


    return (<>
        {
            courses.length > 0 ?
                <CourseCard categoryName="courses" products={courses} /> : null
        }
    </>
    )
}

export default Courses