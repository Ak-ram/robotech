'use client';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  // Use useNavigation instead of useRouter
  const searchPar = useSearchParams();
  const idString = searchPar?.get("id");
  console.log(idString)

  return <h1>Page for customer ID: {idString}</h1>;
};

export default Page;
