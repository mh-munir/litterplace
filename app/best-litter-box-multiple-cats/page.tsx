import EmailForm from "@/components/EmailForm";
import Link from "next/link";

export const metadata = {
  title: "Litter Box for Multiple Cats | litterplace.com",
  description: "Learn about our effective Litter Box for Multiple Cats solutions",
};

const BestLitterBoxMultipleCats = () => {

  return (
    <main>
        <section 
          className="min-h-screen bg-cover bg-center bg-no-repeat">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center gap-4 bg-[#E8CFB3] bg-opacity-90">
              <div className="w-full min-h-86">
                <div className="max-w-lg container mx-auto px-4 min-h-screen flex flex-col justify-center">
                <div className="max-w-lg mb-5">
                    <h1 className="text-3xl font-bold">Best Litter Boxes for Multiple Cats</h1>
                    <p className="text-base">
                       Multiple cats need more space and more frequent cleaning. Take our quick quiz to find the right box for how many cats you have.
                    </p>
                </div>
                <div>
                    <EmailForm source="multiplecats" />
                </div>
                <Link href="/" className="mt-5 text-sm text-gray-700 hover:underline">
                    ← Back to Home
                </Link>
                </div>
              </div>

              <div style={{ backgroundImage: "var(--bg-bestLitterBoxMultipleCats)" }} className="bg-main-bg bg-cover bg-right bg-no-repeat min-h-screen">
                {/* Empty second column for balance */}
              </div>
          </div>
        </section>
    </main>
  );
};

export default BestLitterBoxMultipleCats;