'use client';
import withAuth from "./middleware/withAuth";



 function Home() {
  return (
   <>
   <h1>Hello user welcome</h1>
   </>
  );
}


export default withAuth(Home, ['user'])