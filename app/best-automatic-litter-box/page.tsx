import EmailForm from "@/components/EmailForm";
import Link from "next/link";

export const metadata = {
  title: "Best Automatic Litter Boxes | litterplace.com",
  description: "Learn about our effective Best Automatic Litter Box solutions",
};

const BestAutomaticLitterBox = () => {

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
                    <h1 className="text-3xl font-bold">Best Automatic Litter Boxes</h1>
                    <p className="text-base">
                        Self cleaning litter boxes save time and reduce smell. Take our quick quiz to find the right one for your cat and your budget.
                    </p>
                </div>
                <div>
                    <EmailForm source="automatic" />
                </div>
                <Link className="hover:underline text-md text-gray-700 cursor-pointer mt-5" href="/">← Back to Home</Link>
                <div className="mt-5 md:mt-10 max-w-xl">
                    <h4 className="mb-2 text-lg font-medium">Helpful</h4>
                      <ul className='flex gap-4'>
                        <li><Link className="hover:underline text-md text-gray-700" href="/best-litter-box-multiple-cats">Best Litter Box Multiple Cats</Link></li>
                        <li><Link className="hover:underline text-md text-gray-700" href="/litter-box-small-apartment">Litter Box Small Apartments</Link></li>
                    </ul>
                </div>
                </div>
              </div>

              <div style={{ backgroundImage: "var(--bg-bestAautomaticLitterBox)" }} className="bg-main-bg bg-cover bg-right bg-no-repeat min-h-screen">
                {/* Empty second column for balance */}
              </div>
          </div>
        </section>
    </main>
  );
};

export default BestAutomaticLitterBox;