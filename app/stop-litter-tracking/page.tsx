import EmailForm from "@/components/EmailForm";
import Link from "next/link";

export const metadata = {
  title: "Stop Litter Tracking Solutions | litterplace.com",
  description: "Learn how to prevent litter from tracking around your home. Take our quiz to find the best litter box solutions for clean floors.",
  keywords: ["stop litter tracking", "litter tracking solutions", "clean litter box", "no mess litter box", "litter containment"],
};

const StopLitterTracking = () => {

  return (
    <main>
        <section 
          className="min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg-image.jpg')" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center gap-4 bg-[#E8CFB3] bg-opacity-90">
              <div className="w-full min-h-86">
                <div className="max-w-lg container mx-auto px-4 min-h-screen flex flex-col justify-center">
                <div className="max-w-lg mb-5">
                    <h1 className="text-3xl font-bold">How to Stop Litter Tracking</h1>
                    <p className="text-base">
                        Litter on the floor is usually a box problem. Take our quick quiz to find out what change will make the biggest difference.
                    </p>
                </div>
                <div>
                    <EmailForm source="tracking" />
                </div>
                 <Link className="hover:underline text-md text-gray-700 cursor-pointer mt-5" href="/">← Back to Home</Link>
                <div className="mt-5 md:mt-10 max-w-xl">
                    <h4 className="mb-2 text-lg font-medium">Helpful</h4>
                      <ul className='flex gap-4'>
                        <li><Link className="hover:underline text-md text-gray-700" href="/hidden-litter-box-furniture">Hidden Litter Box Furniture</Link></li>
                        <li><Link className="hover:underline text-md text-gray-700" href="/litter-box-odor-control">Litter Box Odor Control</Link></li>
                    </ul>
                </div>
                </div>
              </div>

              <div style={{ backgroundImage: "var(--bg-stopLitterTracking)" }} className="bg-main-bg bg-cover bg-right bg-no-repeat min-h-screen">
                {/* Empty second column for balance */}
              </div>
          </div>
        </section>
    </main>
  );
};

export default StopLitterTracking;