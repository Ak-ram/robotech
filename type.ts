export interface ProductType {
  image1: string | undefined;
  image2: string | undefined;
  image3: string | undefined;
  categoryName: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  count: number;
  id: string;
  title: string;
  description: string;
  price: number;
  previousPrice: number;
  isNew: boolean;
  category: string;
  quantity: number;
  externalLink: string;
  unit: string;
}

export interface CourseType {
  enrollmentLink: string;
  id: string;
  poster: string;
  video: string;
  rate: number;
  title: string;
  price: number;
  previousPrice: number;
  studentsEnrolled: number;
  description: string;
  enrollmentOpen: string;
  instructor: string;
  instructor_info: string;
  duration: number;
  category: string;
  startDateTime: string;
  level: string;
  index: string;
  last_updated: string;
  more_details: string;
}



export interface ItemProps {
  item: ProductType;
}

export interface StateProps {
  pro: {
    productData: ProductType[];
    userInfo: null | { email: string; password: string }; // Adjust this based on your actual state structure
    superAdminInfo: null | { email: string; password: string }; // Adjust this based on your actual state structure
    orderData: {
      length: number;
      map(arg0: (item: ProductType) => import("react").JSX.Element): import("react").ReactNode;
      order: ProductType[];
    };
    favoriteData: ProductType[];
    compareData: ProductType[];
  };
}



export interface SidebarItem {
  id: number;
  label: string;
  content: any;
  icon: any;
}
