import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the token/cookie from the client-side
        // Redirect to the desired page after successful logout
        router.push("/");
      } else {
        console.error('Failed to logout');
        // Handle accordingly, maybe show an error message to the user
      }
    } catch (error) {
      console.error('Error occurred while logging out:', error);
      // Handle the error, show an error message, etc.
    } finally {
      // Close the confirmation box regardless of the outcome
      setShowConfirmation(false);
    }
  };

  return (
    <>
      {showConfirmation && (
        <main className="flex pt-10 justify-center h-screen w-screen" style={{ backdropFilter: "blur(5px)" }}>
          <section className="flex flex-col h-[350px] w-[550px] justify-center items-center bg-gray-900 text-white rounded-md">
            <div className="w-5/6 p-14 flex flex-col gap-9 justify-center items-center">
              <div className="text-center text-4xl font-medium">You're Leaving</div>

              <button
                onClick={handleLogout} 
                className="transform rounded-full bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 px-7"
              >
                Confirm
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
