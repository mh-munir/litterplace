"use client";

// /components/Result.tsx

export default function Result({ result }: any) {
  if (!result) return null;

  const { productName, priceRange, description, amazonUrl, imageUrl, alternatives } = result;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Here is your match</h1>

      <div className="border border-gray-500 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-4">
          <img
            src={imageUrl}
            alt={productName}
            className="w-36 h-36 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">{productName}</h2>
            <p className="text-sm text-gray-800 mb-2">{description}</p>
            <p className="text-sm text-gray-600">Price range: <span className="font-medium text-gray-700">{priceRange}</span></p>
          </div>
        </div>

        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-white text-center font-normal hover:bg-gray-700 transition"
        >
          See best price on Amazon →
        </a>
      </div>

      {alternatives?.length ? (
        <div>
          <h3 className="text-lg font-medium mb-1">Also consider these</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alternatives.map((alt: any) => (
              <div key={alt.name}>
                  <p className="font-medium text-sm text-gray-800">{alt.name}</p>
                  <a
                    href={alt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900 transition hover:underline"
                  >
                    Buy →
                  </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
