import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaGenderless, FaMapMarkerAlt, FaBriefcase, FaUserMd, FaPhoneAlt } from "react-icons/fa";
import { useAuthStore } from "@/store/Auth";
import { useUserStore } from "@/store/User";
import { useDoctorStore } from "@/store/Doctor";

const Doctorinfo = () => {
  const {user} = useAuthStore()
  const {profile} = useDoctorStore()
  return (
  <div className="p-10 w-full">
      <Card className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <img
            src={profile?.imageUrl}
            alt="Patient Profile"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            <span className="text-gray-700">Full Name: {profile?.name}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            <span className="text-gray-700">experience: {profile?.experience}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            <span className="text-gray-700">specialization: {profile?.specialization}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-500" />
            <span className="text-gray-700">Email Address: {user?.email} </span>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-gray-500" />
            <span className="text-gray-700">Phone Number: {profile?.contact}</span>
          </div>
          <div className="flex items-center">
            <FaBirthdayCake className="mr-2 text-gray-500" />
            <span className="text-gray-700">Date of Birth: January 1, 1980</span>
          </div>
          <div className="flex items-center">
            <FaGenderless className="mr-2 text-gray-500" />
            <span className="text-gray-700">Gender: {profile?.gender}</span>
          </div>
       
          
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button variant="outline" className="w-full">
          Update Information
        </Button>
      </CardFooter> */}
    </Card>
  </div>
  );
};

export default Doctorinfo;
