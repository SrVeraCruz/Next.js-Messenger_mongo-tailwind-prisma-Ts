import Image from "next/image";
import AuthForm from "./components/authForm/AuthForm";

export default function Home() {

  return (
    <div 
      className="flex min-h-full flex-col justify-center 
      py-12 bg-gray-100
      sm:px-6 lg:px-8"
    >
      <div 
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Image 
          width={90}
          height={90}
          src="/images/logo.png" 
          alt="logo" 
          className="mx-auto" 
        />
        <h2 
          className="text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
