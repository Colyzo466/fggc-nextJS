import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-800 font-sans">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full bg-gray-900/95 rounded-xl shadow-2xl p-10 flex flex-col items-center border border-yellow-800">
          <div className="mb-8 w-full h-64 overflow-hidden rounded-xl border-4 border-yellow-400 bg-gray-800 flex items-center justify-center">
            <Image src="/FGGC.png" alt="GGPC Company Logo" width={320} height={240} className="object-contain w-full h-full" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-300 mb-4 text-center drop-shadow-lg">About Golden Growth Peer Connection</h1>
          <p className="text-lg sm:text-xl text-yellow-100 mb-6 text-center font-medium">
            Golden Growth Peer Connection (GGPC) is a trusted peer-to-peer financial platform dedicated to empowering individuals and communities through transparent contributions and sustainable returns. Our mission is to foster financial growth, trust, and prosperity by connecting people in a secure, innovative, and supportive environment.
          </p>
          <div className="w-full flex flex-col gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-5 border border-yellow-900">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Our Vision</h2>
              <p className="text-yellow-100">To be the leading platform for peer-driven financial empowerment and community growth in Africa and beyond.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 border border-yellow-900">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Our Mission</h2>
              <p className="text-yellow-100">To provide a transparent, secure, and user-friendly system for contributions, payments, and returns, enabling members to achieve their financial goals together.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-5 border border-yellow-900">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Our Values</h2>
              <ul className="list-disc list-inside text-yellow-100">
                <li>Trust & Transparency</li>
                <li>Community & Collaboration</li>
                <li>Growth & Prosperity</li>
                <li>Innovation & Security</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-yellow-600 text-sm mt-2">
            &copy; {new Date().getFullYear()} Golden Growth Peer Connection (GGPC). All rights reserved.
          </div>
        </div>
      </main>
    </div>
  );
}
