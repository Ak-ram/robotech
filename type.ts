export interface ProductType {
  image1: string | undefined;
  image2: string | undefined;
  image3: string | undefined;
  categoryName:
  | string
  | number
  | boolean
  | readonly string[]
  | readonly number[]
  | readonly boolean[]
  | null
  | undefined;
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
      map(
        arg0: (item: ProductType) => import("react").JSX.Element,
      ): import("react").ReactNode;
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

export interface CustomerType {
  fullName: string;
  phone: string;
  address: string;
  faculty: string;
  join_date: string;
  total_purchase_transactions: number;
  transactions: {};
}

export interface transactionsType {
  courses: CourseType[];
  products: ProductType[];
  services: any[];
}

export interface Order {
  date: string;
  discount: number;
  quantity: number;
  subtotal: number;
  piecePrice: number;
  productName: string;
}

export interface Transaction {
  date: string;
  discount: number;
  isRefund: boolean;
  quantity: number;
  subtotal: number;
  productId: string;
  piecePrice: number;
  productName: string;
  wholesalePrice: number;
  productCategory: string;
}

export interface CustomerData {
  id: number;
  phone: string;
  address: string;
  faculty: string;
  fullName: string;
  join_date: string;
  created_at: string;
  transactions: {
    courses: Transaction[];
    products: Transaction[];
    printServices: Transaction[];
  };
  total_purchase_transactions: number;
}

export interface Bill {
  id: number;
  billCreatedDate: string;
  created_at: string;
  data: Transaction[];
  customerData: CustomerData;
}

export interface BillType {
  data: ProductType[];
  customerData: any;
}