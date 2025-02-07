import ProtectedRoute from "@/components/container/Protectedroute";
import Header from "@/components/Dashboard/Header";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
//   const menu = [
//     { name: "Dashboard", icon: <MdDashboard /> },
//     { name: "Appointment", icon: <MdEvent /> },
//     // { name: "Patient", icon: <MdPerson /> },
//     { name: "Myinfo", icon: <MdInfo /> },
//   ];
//   const dispatch = useDispatch();
//   const select = useSelector((state: any) => state.getauthdata);

//   const verifyemail = useSelector((state: any) => state.verifyemail);

//   const { isemailVerify } = verifyemail;

//   const isdataaviable =
//     select.userdata && Object.keys(select.userdata).length > 0;

//   useEffect(() => {
//     console.log("chekc",select);
//     if (!isdataaviable) {
//       dispatch(getuserData()).then((action: any) => {
//         const data = action.payload;
//         console.log("inside:",data);
//         if (getuserData.fulfilled.match(action) && data) {
//           if (!data.emailVerification) {
//             dispatch(emailVerify(true));
//           }
//         }
//       });
//     } else {
//       console.log("data is already inside");
//     }
//   }, []);

//   if (select.isLoading ) {
//     return <Loading open={select.isLoading } />;
//   }

  return (
    <ProtectedRoute >
      <Header logo="User" />
      <div className="flex ">
        <div className="flex-shrink-0 ">
          {/* <Sidebar menu={menu} page="User" /> */}
        </div>

        {/* <div className="overflow-x-scroll w-full  ">
          {(isemailVerify &&
            isdataaviable &&
            !select.userdata.emailVerification) ?  <Verifyemailnotification /> : children}
          
        </div> */}
        {children}
      </div>
    
    </ProtectedRoute>
  );
};

export default layout;