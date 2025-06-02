import Image from "next/image";
import Link from "next/link";
import AboutPage from "./about/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-yellow-900 to-gray-800 font-sans">
      <header className="w-full py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center bg-gray-950/95 shadow-lg border-b border-yellow-700 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <Image src="/globe.svg" alt="Global Grants Peer Connects Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-yellow-200 tracking-wide drop-shadow">GGPC</span>
        </div>
        <nav className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center">
          <Link href="/register" className="px-3 py-1 rounded text-yellow-100 font-semibold hover:bg-yellow-800/30 hover:text-yellow-300 transition">Register</Link>
          <Link href="/login" className="px-3 py-1 rounded text-yellow-100 font-semibold hover:bg-yellow-800/30 hover:text-yellow-300 transition">Login</Link>
          <Link href="/dashboard" className="px-3 py-1 rounded text-yellow-100 font-semibold hover:bg-yellow-800/30 hover:text-yellow-300 transition">Dashboard</Link>
          <Link href="/admin" className="px-3 py-1 rounded text-yellow-100 font-semibold hover:bg-yellow-800/30 hover:text-yellow-300 transition">Admin</Link>
          <Link href="/notifications" className="px-3 py-1 rounded text-yellow-100 font-semibold hover:bg-yellow-800/30 hover:text-yellow-300 transition">Notifications</Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-8 sm:py-12 w-full">
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
      <footer className="w-full bg-gray-950/95 border-t border-yellow-800 py-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 shadow-inner">
        <div className="flex items-center gap-2">
          <Image src="/globe.svg" alt="Global Grants Peer Connects Logo" width={28} height={28} />
          <span className="text-yellow-200 font-bold text-lg">GGPC</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-yellow-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Global Growth Peer Connection (GGPC). All rights reserved.
          </div>
          <div className="flex gap-4 mt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-yellow-300 hover:text-yellow-100 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-yellow-300 hover:text-yellow-100 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.767 1.197-1.767 2.434v4.683h-3v-9h2.881v1.233h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v4.731z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-yellow-300 hover:text-yellow-100 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.162 0h-4.327l-5.835 8.228-5.835-8.228h-4.327l8.228 11.627-8.228 12.373h4.327l5.835-8.228 5.835 8.228h4.327l-8.228-12.373z"/></svg>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-yellow-300 hover:text-yellow-100 transition">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.519-5.688-1.507l-6.305 1.713zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.651-1.033-5.138-2.901-7.008-1.869-1.87-4.356-2.905-7.006-2.905-5.451 0-9.888 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.768-.964zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.366.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
            </a>
          </div>
        </div>
        <div className="flex gap-3">
          <a href="mailto:support@ggpc.com" className="text-yellow-300 hover:text-yellow-100 underline transition">Contact Support</a>
          <a href="/privacy" className="text-yellow-300 hover:text-yellow-100 underline transition">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
