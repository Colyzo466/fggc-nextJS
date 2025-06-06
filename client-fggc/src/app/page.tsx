import Image from "next/image";
import Link from "next/link";
import AboutPage from "./about/page";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-800 font-sans">
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-8 sm:py-12 w-full">
        <button
          className="mb-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg shadow transition"
          onClick={() => toast.success('Welcome to GGPC!')}
        >
          Show Welcome Toast
        </button>
        <div className="max-w-2xl w-full bg-gray-900/90 rounded-xl shadow-2xl p-4 sm:p-10 flex flex-col items-center border border-yellow-800 mx-auto">
          <div className="w-full flex flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-yellow-300 text-right drop-shadow-lg whitespace-pre-line">
              Global Growth Peer Connection
            </h1>
            <div className="flex-1 flex justify-end relative min-h-[100px] min-w-[100px]" style={{height: '140px'}}>
              <Image src="/Currence.png" alt="Currencies" fill sizes="(max-width: 768px) 100vw, 50vw" style={{objectFit: 'contain'}} className="rounded-lg" />
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-yellow-100 mb-6 text-center font-medium">
            Empowering your financial growth through trusted peer-to-peer contributions and transparent returns. Join a thriving community and take control of your prosperity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center">
            <Link href="/register" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition w-full sm:w-auto text-center">Get Started</Link>
            <Link href="/dashboard" className="bg-gray-800 border border-yellow-400 hover:bg-yellow-900 text-yellow-200 font-semibold py-3 px-8 rounded-lg shadow-lg transition w-full sm:w-auto text-center">View Dashboard</Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
            <li className="bg-gray-800 rounded-lg p-5 shadow flex flex-col items-center border border-yellow-900">
              <span className="text-2xl font-bold text-yellow-400 mb-2">Peer Contributions</span>
              <span className="text-yellow-100 text-center">Contribute and receive returns transparently with our secure system.</span>
            </li>
            <li className="bg-gray-800 rounded-lg p-5 shadow flex flex-col items-center border border-yellow-900">
              <span className="text-2xl font-bold text-yellow-400 mb-2">Track Your Growth</span>
              <span className="text-yellow-100 text-center">Monitor your payments, contributions, and returns in real time.</span>
            </li>
            <li className="bg-gray-800 rounded-lg p-5 shadow flex flex-col items-center border border-yellow-900">
              <span className="text-2xl font-bold text-yellow-400 mb-2">Admin Management</span>
              <span className="text-yellow-100 text-center">Admins manage users, payments, and contributions efficiently.</span>
            </li>
            <li className="bg-gray-800 rounded-lg p-5 shadow flex flex-col items-center border border-yellow-900">
              <span className="text-2xl font-bold text-yellow-400 mb-2">Instant Notifications</span>
              <span className="text-yellow-100 text-center">Stay updated with in-app and email notifications for every activity.</span>
            </li>
          </ul>
        </div>
        <section className="w-full mt-8 flex justify-center px-0 sm:px-4">
          <div className="w-full max-w-3xl">
            <AboutPage />
          </div>
        </section>
        {/* Testimonies Section */}
        <section className="w-full mt-12 flex justify-center px-0 sm:px-4">
          <div className="w-full max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-8 text-center drop-shadow-lg">
              What Our Members Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimony 1 */}
              <div className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center border border-yellow-800">
                <Image
                  src="/testimony1.png"
                  alt="Testifier 1"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-yellow-400 mb-4"
                />
                <p className="text-yellow-100 text-center mb-4 italic">
                  “Joining GGPC has been a life-changing experience. I was able to save, contribute, and receive returns that helped me start my own business. The transparency and support are unmatched!”
                </p>
                <span className="font-bold text-yellow-300">Samuel O., Lagos</span>
                <span className="text-yellow-400 text-sm">Entrepreneur</span>
              </div>
              {/* Testimony 2 */}
              <div className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center border border-yellow-800">
                <Image
                  src="/testimony2.png"
                  alt="Testifier 2"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-yellow-400 mb-4"
                />
                <p className="text-yellow-100 text-center mb-4 italic">
                  “GGPC gave me the financial discipline I needed. The peer-to-peer system is so easy to use, and the community is always there to help. I highly recommend it to anyone looking to grow.”
                </p>
                <span className="font-bold text-yellow-300">Chinwe E., Abuja</span>
                <span className="text-yellow-400 text-sm">Civil Servant</span>
              </div>
              {/* Testimony 3 */}
              <div className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center border border-yellow-800">
                <Image
                  src="/testimony3.png"
                  alt="Testifier 3"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-yellow-400 mb-4"
                />
                <p className="text-yellow-100 text-center mb-4 italic">
                  “I never thought saving and investing could be this simple. GGPC’s instant notifications and easy tracking make me feel secure and in control of my finances.”
                </p>
                <span className="font-bold text-yellow-300">Ifeanyi N., Port Harcourt</span>
                <span className="text-yellow-400 text-sm">Student</span>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/register" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition text-center">
                Join GGPC Today
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
