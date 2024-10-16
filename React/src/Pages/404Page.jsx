import React from "react";
import { Button } from "@material-tailwind/react";
import Lottie from "lottie-react";
import notFound from "../assets/notFound.json";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="md:grid md:grid-cols-2 gap-4 p-8 items-center min-h-screen">
        <div>
          <Lottie animationData={notFound} loop={true} />
        </div>
        <div>
          <h1 className="text-7xl font-bold">404</h1>
          <h6 className="text-3xl my-5 font-semibold">UH OH! You're lost.</h6>
          <p className="text-lg">
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <div className="text-center md:text-left">
            <Button
              className="mt-5 rounded-full w-[7rem] h-[3rem] bg-[#003060]"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
