import EmailForm from "@/components/EmailForm";
import Link from "next/link";

export const metadata = {
  title: "Hidden Litter Box Furniture | litterplace.com",
  description: "Some furniture pieces hide the litter box completely so it blends into the room. Take our quick quiz to find the right fit for your home.",
};

const HiddenLitterBoxFurniture = () => {

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
                    <h1 className="text-3xl font-bold">Hidden Litter Box Furniture</h1>
                    <p className="text-base">
                        Some furniture pieces hide the litter box completely so it blends into the room. Take our quick quiz to find the right fit for your home.
                    </p>
                </div>
                <div>
                    <EmailForm source="hidden" />
                </div>
                <div className="mt-5 md:mt-10 max-w-xl">
                    <h4 className="mb-2 text-lg font-medium">Helpful</h4>
                      <ul className='flex gap-4'>
                        <li><Link className="hover:underline text-md text-gray-700" href="/stop-litter-tracking">Stop Litter Tracking</Link></li>
                        <li><Link className="hover:underline text-md text-gray-700" href="/litter-box-odor-control">Litter Box Odor Control</Link></li>
                    </ul>
                </div>
                </div>
              </div>

              <div style={{ backgroundImage: "var(--bg-hiddenLitterBoxFurniture)" }} className="bg-main-bg bg-cover bg-right bg-no-repeat min-h-screen">
                {/* Empty second column for balance */}
              </div>
          </div>
        </section>
    </main>
  );
};

export default HiddenLitterBoxFurniture;