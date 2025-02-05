'use client'
import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main>

      <Banner />
      <Products />
        
      <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000",
                color: "#fff",
              },
            }}
          />
    </main>
  );
}
