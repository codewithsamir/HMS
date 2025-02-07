import ProtectedRoute from "@/components/container/Protectedroute";
import Header from "@/components/Dashboard/Header";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {


  return (
    <ProtectedRoute >
      <Header logo="User" />
      <div className="flex ">
        <div className="flex-shrink-0 ">
          {/* <Sidebar menu={menu} page="User" /> */}
        </div>

      
        {children}
      </div>
    
    </ProtectedRoute>
  );
};

export default layout;