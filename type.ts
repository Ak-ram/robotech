export interface ProductType {
  count: ReactNode;
  id: number | null | undefined;
  title: string;
  description: string;
  image: string;
  price: number;
  previousPrice: number;
  isNew: boolean;
  category: string;
  quantity: number;
}

export interface ItemProps {
  item: ProductType;
}

export interface StateProps {
  pro: {
    productData: ProductType[];
    userInfo: null | { email: string; password: string }; // Adjust this based on your actual state structure
    orderData: {
      length: number;
      map(arg0: (item: ProductType) => import("react").JSX.Element): import("react").ReactNode;
      order: ProductType[];
    };
    favoriteData: ProductType[];
  };
}
